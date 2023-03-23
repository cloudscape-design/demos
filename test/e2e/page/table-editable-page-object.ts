// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
/* eslint-disable @typescript-eslint/no-empty-function,require-await */
import TableFilteringPageObject from './table-filtering-page-object';

export default class TableEditablePageObject extends TableFilteringPageObject {
  getCellText(row: number, column: number) {
    return this.getText(this.tableWrapper.findBodyCell(row, column).toSelector());
  }

  waitForEditSave() {
    return this.waitForVisible(this.tableWrapper.findEditingCellSaveButton().toSelector(), false);
  }

  waitForEditFail() {
    return this.waitForVisible(this.tableWrapper.findEditingCellSaveButton().toSelector(), true);
  }

  async performStateEdit(row: number, currentVal: string) {
    const bodyCell = this.tableWrapper.findBodyCell(row, 3);
    const select = this.tableWrapper.findEditingCell().findSelect();
    const dropdown = select.findDropdown({ expandToViewport: true });
    await this.click(bodyCell.toSelector());
    await this.click(select.findTrigger().toSelector());
    await this.click(dropdown.findOption(currentVal === 'Activated' ? 2 : 1).toSelector());
    await this.keys(['Tab', 'Tab', 'Enter']);
    await this.waitForEditSave();
    return this.getText(bodyCell.toSelector());
  }

  async performBadDomainEdit(row: number) {
    const bodyCell = this.tableWrapper.findBodyCell(row, 4);
    const input = bodyCell.findFormField().find('input');
    await this.click(bodyCell.toSelector());
    await this.click(input.toSelector());
    await this.browser.$(input.toSelector()).setValue('bad domain name');
    await this.keys(['Enter']);
    await this.waitForEditFail();
    return this.getText(bodyCell.findFormField().findError().toSelector());
  }

  async performGoodDomainEdit(row: number, value: string) {
    const bodyCell = this.tableWrapper.findBodyCell(row, 4);
    const input = bodyCell.findFormField().find('input');
    await this.click(bodyCell.toSelector());
    await this.click(input.toSelector());

    const current = await this.browser.$(input.toSelector()).getValue();
    const backspaces = Array(current.length).fill('Backspace');
    await this.keys(backspaces);
    await this.browser.$(input.toSelector()).setValue(value);

    await this.click(bodyCell.findButton('[type="submit"]').toSelector());
    await this.waitForEditSave();

    return this.getText(bodyCell.toSelector());
  }

  async performSSLEdit(row: number) {
    const bodyCell = this.tableWrapper.findBodyCell(row, 6);
    const autosuggest = this.tableWrapper.findEditingCell().findAutosuggest();
    const dropdown = autosuggest.findDropdown({ expandToViewport: true });
    await this.click(bodyCell.toSelector());
    await this.click(autosuggest.toSelector());
    await this.click(dropdown.findOptionByValue('ACM').toSelector());

    await this.click(bodyCell.findButton('[type="submit"]').toSelector());
    await this.waitForEditSave();

    return this.getText(bodyCell.toSelector());
  }

  getErrorText() {
    const bodyCell = this.tableWrapper.findEditingCell();
    return this.getText(bodyCell.findFormField().findError().toSelector());
  }
}
