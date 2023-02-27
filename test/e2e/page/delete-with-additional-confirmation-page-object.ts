// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import DeleteWithConfirmation from './delete-with-confirmation-page-object';

export default class DeleteWithAdditionalConfirmationPageObject extends DeleteWithConfirmation {
  async typeAdditionalConfirmation() {
    await this.click(this.modalWrapper.findContent().findInput().toSelector());
    await this.keys('confirm');
  }
}
