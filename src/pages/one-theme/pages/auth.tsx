// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import AppLayoutToolbar from '@cloudscape-design/components/app-layout-toolbar';
import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Checkbox from '@cloudscape-design/components/checkbox';
import Container from '@cloudscape-design/components/container';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Input from '@cloudscape-design/components/input';
import Link from '@cloudscape-design/components/link';
import type { SelectProps } from '@cloudscape-design/components/select';
import Select from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Spinner from '@cloudscape-design/components/spinner';
import * as awsui from '@cloudscape-design/design-tokens';

import backgroundSignup from '../../../common/background-signup.png';

type Step = 'email' | 'name' | 'verify' | 'password' | 'contact' | 'loading';

const COUNTRIES: SelectProps.Option[] = [
  { label: '🇺🇸 United States (+1)', value: 'us' },
  { label: '🇩🇪 Germany (+49)', value: 'de' },
  { label: '🇬🇧 United Kingdom (+44)', value: 'gb' },
  { label: '🇫🇷 France (+33)', value: 'fr' },
  { label: '🇯🇵 Japan (+81)', value: 'jp' },
];

const SOCIAL_PROVIDERS = [
  { id: 'amazon', label: 'Amazon' },
  { id: 'apple', label: 'Apple' },
  { id: 'google', label: 'Google' },
  { id: 'github', label: 'GitHub' },
];

function SocialIcon({ id }: { id: string }) {
  const style = { width: 18, height: 18, flexShrink: 0 } as const;
  switch (id) {
    case 'amazon':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" style={style}>
          <path d="M9.45115 5.68044C6.86587 5.7622 4.40568 6.4572 4.40568 8.9919C4.40568 10.7498 5.48983 11.6084 6.94926 11.6084C8.2419 11.6084 9.07586 11.1178 9.78473 10.3819C10.1183 10.8316 10.2017 11.036 10.7855 11.4857C10.9106 11.5675 11.1191 11.5675 11.2025 11.4448L12.4951 10.341C12.6619 10.2184 12.5785 10.014 12.4951 9.9322C12.2032 9.48249 11.8696 9.15543 11.8696 8.33779V5.72132C11.8696 4.6175 11.953 3.59544 11.1191 2.85956C10.4102 2.20544 9.53454 2.04191 8.53379 2.00103C6.32379 1.96014 4.86436 3.14573 4.65587 4.53573C4.61417 4.78102 4.82266 4.90367 4.94776 4.90367L6.49059 5.10808C6.74077 5.14897 6.86587 4.94455 6.90757 4.78102C7.15775 3.88161 8.11681 3.63632 8.70058 3.84073C9.53454 4.08603 9.45115 5.02632 9.45115 5.68044ZM7.95002 9.97308C7.32455 9.97308 6.90757 9.44161 6.90757 8.74661C6.94926 7.27485 8.11681 7.02955 9.45115 7.02955V7.76543C9.45115 9.07367 8.74228 9.97308 7.95002 9.97308Z" />
        </svg>
      );
    case 'apple':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" style={style}>
          <path d="M8.19297 3.69231C8.91406 3.69231 9.81797 3.20407 10.3563 2.55308C10.8438 1.96313 11.1992 1.13922 11.1992 0.31532C11.1992 0.203432 11.1891 0.0915448 11.1688 0C10.3664 0.0305149 9.40156 0.539097 8.82266 1.2206C8.36563 1.73935 7.94922 2.55308 7.94922 3.38716C7.94922 3.50922 7.96953 3.63128 7.97969 3.67196C8.03047 3.68214 8.11172 3.69231 8.19297 3.69231ZM5.65391 16C6.63906 16 7.07578 15.3388 8.30469 15.3388C9.55391 15.3388 9.82813 15.9797 10.925 15.9797C12.0016 15.9797 12.7227 14.9828 13.4031 14.0064C14.1648 12.8875 14.4797 11.7889 14.5 11.7381C14.4289 11.7177 12.3672 10.8735 12.3672 8.5035C12.3672 6.44882 13.9922 5.5232 14.0836 5.452C13.007 3.90591 11.3719 3.86523 10.925 3.86523C9.71641 3.86523 8.73125 4.59758 8.11172 4.59758C7.44141 4.59758 6.55781 3.90591 5.51172 3.90591C3.52109 3.90591 1.5 5.55372 1.5 8.66624C1.5 10.5989 2.25156 12.6434 3.17578 13.9657C3.96797 15.0846 4.65859 16 5.65391 16Z" />
        </svg>
      );
    case 'google':
      return (
        <svg viewBox="0 0 24 24" style={style}>
          <path
            d="M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z"
            fill="#4285F4"
          />
          <path
            d="M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z"
            fill="#FBBC05"
          />
          <path
            d="M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z"
            fill="#EB4335"
          />
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 16 16" fill="currentColor" style={style}>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.00662 0C3.57917 0 0 3.66665 0 8.2028C0 11.8288 2.29329 14.8981 5.4747 15.9844C5.87246 16.0661 6.01816 15.8079 6.01816 15.5908C6.01816 15.4006 6.00505 14.7488 6.00505 14.0696C3.7778 14.5586 3.31399 13.0918 3.31399 13.0918C2.95606 12.1411 2.42572 11.8968 2.42572 11.8968C1.69674 11.3943 2.47882 11.3943 2.47882 11.3943C3.28744 11.4486 3.71175 12.2363 3.71175 12.2363C4.42745 13.4856 5.58074 13.1326 6.04471 12.9153C6.11092 12.3856 6.32315 12.0189 6.5485 11.8153C4.77211 11.6251 2.90313 10.919 2.90313 7.76813C2.90313 6.87181 3.22107 6.13847 3.72486 5.56814C3.64538 5.36448 3.36693 4.52231 3.80451 3.39515C3.80451 3.39515 4.48055 3.17782 6.00488 4.23715C6.6575 4.05759 7.33054 3.96625 8.00662 3.96548C8.68266 3.96548 9.37181 4.06065 10.0082 4.23715C11.5327 3.17782 12.2087 3.39515 12.2087 3.39515C12.6463 4.52231 12.3677 5.36448 12.2882 5.56814C12.8053 6.13847 13.1101 6.87181 13.1101 7.76813C13.1101 10.919 11.2411 11.6115 9.45146 11.8153C9.74318 12.0733 9.99492 12.5621 9.99492 13.3363C9.99492 14.4363 9.98181 15.3191 9.98181 15.5906C9.98181 15.8079 10.1277 16.0661 10.5253 15.9846C13.7067 14.8979 16 11.8288 16 8.2028C16.0131 3.66665 12.4208 0 8.00662 0Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: `url(${backgroundSignup}) center center / cover no-repeat`,
      }}
    >
      <div
        style={{
          padding: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'fixed',
          top: 0,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Box fontSize="heading-m">
          <svg width="61" height="36" viewBox="0 0 61 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_26_4679)">
              <path
                d="M16.9478 13.054C16.9478 13.802 17.0238 14.396 17.1758 14.838C17.3278 15.282 17.5438 15.76 17.8238 16.274C17.9158 16.438 17.9638 16.588 17.9638 16.728C17.9638 16.938 17.8358 17.136 17.5778 17.324L16.3178 18.164C16.1318 18.28 15.9558 18.34 15.7938 18.34C15.5838 18.34 15.3858 18.248 15.1998 18.06C14.9198 17.78 14.6798 17.47 14.4818 17.132C14.2838 16.794 14.0798 16.404 13.8698 15.96C12.3058 17.804 10.3458 18.726 7.9898 18.726C6.3098 18.726 4.9798 18.248 3.9998 17.29C3.0198 16.334 2.5298 15.05 2.5298 13.44C2.5298 11.738 3.1358 10.366 4.3498 9.32802C5.5618 8.29002 7.1958 7.77002 9.2498 7.77002C9.9258 7.77002 10.6318 7.82202 11.3678 7.92802C12.1038 8.03402 12.8678 8.18002 13.6598 8.36602V6.89602C13.6598 5.38002 13.3438 4.31202 12.7158 3.69402C12.0858 3.07602 10.9998 2.76602 9.4598 2.76602C8.7598 2.76602 8.0418 2.85402 7.3078 3.02802C6.5738 3.20402 5.8558 3.43002 5.1558 3.71002C4.8298 3.85002 4.5958 3.93802 4.4558 3.97202C4.3158 4.00602 4.2118 4.02402 4.1418 4.02402C3.8618 4.02402 3.7218 3.81402 3.7218 3.39402V2.41402C3.7218 2.08802 3.7678 1.85402 3.8618 1.71402C3.9538 1.57402 4.1418 1.43402 4.4218 1.29402C5.1218 0.944016 5.9618 0.642016 6.9418 0.384016C7.9218 0.128016 8.95979 -0.00198364 10.0558 -0.00198364C12.4358 -0.00198364 14.1798 0.540016 15.2878 1.62602C16.3958 2.71002 16.9498 4.35002 16.9498 6.54402V13.054H16.9478ZM8.8278 16.1C9.4818 16.1 10.1698 15.978 10.8938 15.732C11.6178 15.488 12.2458 15.062 12.7838 14.454C13.1098 14.082 13.3378 13.654 13.4658 13.176C13.5938 12.698 13.6578 12.12 13.6578 11.444V10.604C13.0738 10.464 12.4618 10.354 11.8198 10.272C11.1778 10.19 10.5538 10.15 9.9478 10.15C8.6178 10.15 7.6258 10.418 6.9718 10.954C6.3178 11.492 5.9918 12.262 5.9918 13.264C5.9918 14.198 6.2378 14.904 6.7258 15.382C7.2158 15.86 7.9158 16.1 8.8258 16.1H8.8278ZM24.8938 18.27C24.5438 18.27 24.2858 18.206 24.1238 18.078C23.9598 17.95 23.8198 17.688 23.7038 17.29L19.0138 1.82002C18.8958 1.42402 18.8398 1.15402 18.8398 1.01602C18.8398 0.690016 19.0018 0.526016 19.3298 0.526016H21.2898C21.6618 0.526016 21.9258 0.590016 22.0778 0.718016C22.2298 0.846016 22.3638 1.11002 22.4798 1.50602L25.8398 14.736L28.9538 1.50602C29.0458 1.11002 29.1758 0.848016 29.3398 0.718016C29.5018 0.590016 29.7718 0.526016 30.1438 0.526016H31.7538C32.1278 0.526016 32.3958 0.590016 32.5598 0.718016C32.7218 0.846016 32.8518 1.11002 32.9438 1.50602L36.0938 14.912L39.5578 1.50402C39.6738 1.10802 39.8078 0.846016 39.9598 0.716016C40.1118 0.588016 40.3738 0.524016 40.7478 0.524016H42.6018C42.9278 0.524016 43.0918 0.688016 43.0918 1.01402C43.0918 1.10802 43.0798 1.21202 43.0578 1.32802C43.0338 1.44602 42.9878 1.60802 42.9178 1.81802L38.0878 17.288C37.9698 17.686 37.8298 17.948 37.6678 18.076C37.5038 18.204 37.2478 18.268 36.8978 18.268H35.1818C34.8078 18.268 34.5398 18.198 34.3758 18.058C34.2118 17.918 34.0838 17.65 33.9918 17.252L30.8758 4.37202L27.7958 17.252C27.7018 17.65 27.5738 17.918 27.4118 18.058C27.2478 18.198 26.9798 18.268 26.6058 18.268H24.8898L24.8938 18.27ZM50.5838 18.796C49.5338 18.796 48.5078 18.68 47.5038 18.446C46.4998 18.214 45.7298 17.944 45.1938 17.64C44.8678 17.454 44.6618 17.268 44.5818 17.08C44.4998 16.894 44.4598 16.708 44.4598 16.52V15.504C44.4598 15.084 44.6118 14.874 44.9158 14.874C45.0318 14.874 45.1538 14.898 45.2838 14.944C45.4118 14.992 45.5818 15.062 45.7918 15.154C46.4678 15.458 47.2038 15.692 47.9958 15.854C48.7878 16.018 49.5818 16.1 50.3758 16.1C51.6358 16.1 52.6098 15.878 53.2978 15.434C53.9858 14.992 54.3298 14.36 54.3298 13.544C54.3298 12.984 54.1498 12.518 53.7878 12.144C53.4258 11.77 52.7558 11.42 51.7758 11.094L48.8698 10.184C47.3998 9.71802 46.3318 9.04202 45.6678 8.15402C45.0038 7.26802 44.6698 6.30002 44.6698 5.25002C44.6698 4.41002 44.8498 3.67002 45.2118 3.02802C45.5738 2.38602 46.0518 1.83802 46.6458 1.38202C47.2398 0.928016 47.9358 0.582016 48.7278 0.350016C49.5198 0.118016 50.3598 1.63575e-05 51.2478 1.63575e-05C51.6898 1.63575e-05 52.1398 0.0300164 52.5958 0.0880164C53.0518 0.146016 53.4818 0.222016 53.8898 0.316016C54.2978 0.410016 54.6778 0.514016 55.0278 0.630016C55.3778 0.748016 55.6578 0.864016 55.8678 0.980016C56.1478 1.14402 56.3458 1.30802 56.4638 1.47002C56.5798 1.63402 56.6378 1.85402 56.6378 2.13602V3.08002C56.6378 3.50002 56.4858 3.71002 56.1818 3.71002C56.0178 3.71002 55.7618 3.62802 55.4118 3.46402C54.2678 2.95202 52.9838 2.69402 51.5618 2.69402C50.4178 2.69402 49.5318 2.88202 48.9018 3.25402C48.2718 3.62802 47.9578 4.22202 47.9578 5.04002C47.9578 5.60002 48.1558 6.07202 48.5518 6.45802C48.9478 6.84202 49.6838 7.21002 50.7578 7.56002L53.5918 8.47002C55.0378 8.93802 56.0718 9.57802 56.6898 10.396C57.3078 11.212 57.6178 12.146 57.6178 13.196C57.6178 14.06 57.4438 14.836 57.0938 15.524C56.7438 16.212 56.2598 16.802 55.6418 17.292C55.0238 17.782 54.2818 18.156 53.4198 18.412C52.5558 18.668 51.6118 18.796 50.5858 18.796H50.5838ZM53.4098 26.982C46.0278 30.114 38.0038 31.628 30.7058 31.628C19.8858 31.628 9.4118 28.66 0.941795 23.73C0.199795 23.298 -0.348204 24.06 0.267796 24.616C8.11979 31.706 18.4938 35.964 30.0158 35.964C38.2358 35.964 47.7838 33.38 54.3678 28.52C55.4578 27.714 54.5238 26.51 53.4098 26.982ZM55.3738 32.9C55.1338 33.5 55.6498 33.742 56.1938 33.288C59.7258 30.332 60.6398 24.14 59.9158 23.246C59.1978 22.36 53.0218 21.596 49.2518 24.242C48.6718 24.648 48.7718 25.21 49.4158 25.134C51.5398 24.88 56.2638 24.312 57.1058 25.39C57.9498 26.47 56.1698 30.914 55.3738 32.898V32.9Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_26_4679">
                <rect width="60.146" height="35.964" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </Box>
        <Button
          style={{
            root: {
              background: {
                active: 'light-dark(rgb(255, 255, 255), rgb(255, 255, 255))',
                default: 'light-dark(rgb(255, 255, 255), rgb(255, 255, 255))',
                hover: 'light-dark(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.9))',
              },
              color: {
                active: 'light-dark(rgb(0, 0, 0), rgb(0, 0, 0))',
                default: 'light-dark(rgb(0, 0, 0), rgb(0, 0, 0))',
                hover: 'light-dark(rgb(0, 0, 0), rgb(0, 0, 0))',
              },
              borderWidth: '0px',
              paddingBlock: '4px',
              paddingInline: '24px',
            },
          }}
          variant="primary"
        >
          Sign in
        </Button>
      </div>
      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 24px 80px',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('email');

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState<SelectProps.Option | null>(COUNTRIES[0]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [resendSeconds, setResendSeconds] = useState(20);
  const [emailError, setEmailError] = useState('');
  const [nameError, setNameError] = useState('');
  const [codeError, setCodeError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const emailDisplay = (changeable?: boolean) => (
    <FormField label="Email">
      <SpaceBetween direction="horizontal" size="xs">
        {email}
        {changeable && (
          <Link
            variant="primary"
            href="#"
            onFollow={e => {
              e.preventDefault();
              setStep('email');
            }}
          >
            Change
          </Link>
        )}
      </SpaceBetween>
    </FormField>
  );

  // Countdown timer for resend code
  useEffect(() => {
    if (step !== 'verify') {
      return;
    }
    if (resendSeconds <= 0) {
      return;
    }
    const timer = setInterval(() => setResendSeconds(s => s - 1), 1000);
    return () => clearInterval(timer);
  }, [step, resendSeconds]);

  // Loading redirect to the Omega app
  useEffect(() => {
    if (step !== 'loading') {
      return;
    }
    const timer = setTimeout(() => {
      navigate('/console');
    }, 3000);
    return () => clearTimeout(timer);
  }, [step, navigate]);

  const handleEmailContinue = useCallback(() => {
    if (!email.trim() || !email.includes('@')) {
      setEmailError('Enter a valid email address.');
      return;
    }
    setEmailError('');
    setStep('name');
  }, [email]);

  const handleNameContinue = useCallback(() => {
    if (!name.trim()) {
      setNameError('Enter your name.');
      return;
    }
    setNameError('');
    setResendSeconds(20);
    setStep('verify');
  }, [name]);

  const handleVerifyContinue = useCallback(() => {
    if (verificationCode.length < 6) {
      setCodeError('Enter the 6-digit verification code.');
      return;
    }
    setCodeError('');
    setStep('password');
  }, [verificationCode]);

  const handlePasswordContinue = useCallback(() => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setPasswordError('');
    setStep('contact');
  }, [password, confirmPassword]);

  const handleContactContinue = useCallback(() => {
    setStep('loading');
  }, []);

  if (step === 'loading') {
    return (
      <AppLayoutToolbar
        navigationHide={true}
        toolsHide={true}
        disableContentPaddings={true}
        content={
          <AuthShell>
            <div style={{ width: '100%', maxWidth: 520, textAlign: 'center', paddingTop: 40 }}>
              <Container>
                <SpaceBetween size="l">
                  <Box fontSize="heading-xl" textAlign="center">
                    Welcome to AWS, {name}
                  </Box>
                  <Box color="text-body-secondary" textAlign="center">
                    We are setting up your first project account.
                  </Box>
                  <Box color="text-body-secondary" textAlign="center">
                    This process takes around a few seconds to complete.
                  </Box>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
                    <Spinner size="large" />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 12, paddingBottom: 8 }}>
                    {[0, 1, 2].map(i => (
                      <div
                        key={i}
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: [
                            awsui.colorChartsPaletteCategorical1,
                            awsui.colorChartsPaletteCategorical2,
                            awsui.colorChartsPaletteCategorical3,
                          ][i],
                          borderRadius: 6,
                          transform: `rotate(${i * 15 - 15}deg)`,
                        }}
                      />
                    ))}
                  </div>
                </SpaceBetween>
              </Container>
            </div>
          </AuthShell>
        }
      />
    );
  }

  return (
    <AppLayoutToolbar
      navigationHide={true}
      toolsHide={true}
      disableContentPaddings={true}
      content={
        <AuthShell>
          <div style={{ width: '100%', maxWidth: 480 }}>
            {/* {step === 'email' && (
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <Box fontSize="heading-l" textAlign="center">
              Try AWS at no cost for up to 6 months
            </Box>
            <Box color="text-body-secondary" padding={{ top: 's' }}>
              Start with USD $100 in AWS credits, plus earn up to USD $100 by completing various activities.
            </Box>
          </div>
        )} */}
            <Container>
              <SpaceBetween size="l">
                {step === 'email' && (
                  <>
                    <div style={{ fontSize: '64px', lineHeight: '64px' }}>Sign up for AWS</div>
                    <SpaceBetween size="s">
                      <FormField label="Email" errorText={emailError}>
                        <Input
                          value={email}
                          onChange={({ detail }) => setEmail(detail.value)}
                          placeholder="you@example.com"
                          type="email"
                        />
                      </FormField>
                      <Button variant="primary" fullWidth={true} onClick={handleEmailContinue}>
                        Continue
                      </Button>
                    </SpaceBetween>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ flex: 1, height: 1, backgroundColor: awsui.colorBorderDividerDefault }} />
                      <Box color="text-body-secondary" fontSize="body-s">
                        OR
                      </Box>
                      <div style={{ flex: 1, height: 1, backgroundColor: awsui.colorBorderDividerDefault }} />
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {SOCIAL_PROVIDERS.map(p => (
                        <Button key={p.id} fullWidth={true} wrapText={false}>
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                            <SocialIcon id={p.id} />
                            {p.label}
                          </span>
                        </Button>
                      ))}
                    </div>
                    <Box fontSize="body-s" color="text-body-secondary" textAlign="center">
                      By continuing, you agree to the{' '}
                      <Link href="#" fontSize="inherit" external={true} variant="primary">
                        AWS Customer Agreement
                      </Link>
                      , and you acknowledge you have read the{' '}
                      <Link href="#" fontSize="inherit" external={true} variant="primary">
                        AWS Privacy Notice
                      </Link>
                      .
                    </Box>
                  </>
                )}

                {step === 'name' && (
                  <>
                    <Header variant="h1">Enter your name</Header>
                    {emailDisplay(true)}
                    <FormField label="Name" errorText={nameError}>
                      <Input
                        value={name}
                        onChange={({ detail }) => setName(detail.value)}
                        placeholder="Enter your name"
                      />
                    </FormField>
                    <Button variant="primary" fullWidth={true} onClick={handleNameContinue}>
                      Continue
                    </Button>
                  </>
                )}

                {step === 'verify' && (
                  <>
                    <Header variant="h1">Verify your email</Header>
                    <Box color="text-body-secondary">
                      We just sent a verification code to your email. The code expires in 10 minutes.
                    </Box>
                    {emailDisplay(true)}
                    <FormField label="Verification code" errorText={codeError}>
                      <Input
                        value={verificationCode}
                        onChange={({ detail }) => setVerificationCode(detail.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="6 digit"
                        inputMode="numeric"
                      />
                    </FormField>
                    <SpaceBetween size="xs" direction="horizontal">
                      <Button disabled={resendSeconds > 0} onClick={() => setResendSeconds(20)}>
                        {resendSeconds > 0 ? `Resend code ${resendSeconds}s` : 'Resend code'}
                      </Button>
                    </SpaceBetween>
                    <Button variant="primary" fullWidth={true} onClick={handleVerifyContinue}>
                      Continue
                    </Button>
                  </>
                )}

                {step === 'password' && (
                  <>
                    <Header variant="h1">Create password</Header>
                    {emailDisplay()}
                    <SpaceBetween size="s">
                      <FormField label="Password" errorText={passwordError}>
                        <Input
                          value={password}
                          onChange={({ detail }) => setPassword(detail.value)}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                        />
                      </FormField>
                      <FormField label="Confirm password">
                        <Input
                          value={confirmPassword}
                          onChange={({ detail }) => setConfirmPassword(detail.value)}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Confirm password"
                        />
                      </FormField>
                      <Checkbox checked={showPassword} onChange={({ detail }) => setShowPassword(detail.checked)}>
                        Show password
                      </Checkbox>
                    </SpaceBetween>
                    <Button variant="primary" fullWidth={true} onClick={handlePasswordContinue}>
                      Continue
                    </Button>
                  </>
                )}

                {step === 'contact' && (
                  <>
                    <Box fontSize="heading-xl">Enter your contact details</Box>
                    <SpaceBetween size="s">
                      <FormField label="Country">
                        <Select
                          selectedOption={country}
                          onChange={({ detail }) => setCountry(detail.selectedOption)}
                          options={COUNTRIES}
                        />
                      </FormField>
                      <FormField label="Address">
                        <Input
                          value={address}
                          onChange={({ detail }) => setAddress(detail.value)}
                          placeholder="Enter address"
                        />
                      </FormField>
                      <FormField label="Phone number">
                        <Input
                          value={phone}
                          onChange={({ detail }) => setPhone(detail.value)}
                          placeholder="222-333-4444"
                          inputMode="tel"
                        />
                      </FormField>
                    </SpaceBetween>
                    <Button variant="primary" fullWidth={true} onClick={handleContactContinue}>
                      Continue
                    </Button>
                  </>
                )}
              </SpaceBetween>
            </Container>
          </div>
        </AuthShell>
      }
    />
  );
}
