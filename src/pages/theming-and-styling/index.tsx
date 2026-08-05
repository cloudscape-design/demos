// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React from 'react';
import { createRoot } from 'react-dom/client';

import './theme';
import { CustomAppLayout } from '../commons/common-components';
import About from './about';
import Booking from './booking';
import Footer from './footer';
import Header from './header';
import Images from './images';

import '../../styles/base.scss';
import '../../styles/theming-and-styling.scss';

function App() {
  return (
    // "invisible" App layout only needed for runtime theme drawer
    <CustomAppLayout
      toolsHide={true}
      navigationHide={true}
      disableContentPaddings={true}
      content={
        <div className="page-layout-container">
          <div className="page-layout">
            <Header />

            <div className="page-content">
              <Booking />
              <Images />
              <About />
            </div>

            <Footer />
          </div>
        </div>
      }
    />
  );
}

createRoot(document.getElementById('app')!).render(<App />);
