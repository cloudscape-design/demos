// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        background: awsui.colorBackgroundLayoutMain,
      }}
    >
      <div
        style={{
          backgroundColor: awsui.colorBackgroundContainerContent,
          borderBottom: `1px solid ${awsui.colorBorderDividerDefault}`,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box fontSize="heading-m" fontWeight="bold">
          AWS
        </Box>
        <Box fontSize="body-s" color="text-body-secondary">
          🌐 English
        </Box>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
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
      <AuthShell>
        <div style={{ width: '100%', maxWidth: 520, textAlign: 'center', paddingTop: 40 }}>
          <Container>
            <SpaceBetween size="l">
              <Box fontSize="heading-xl" fontWeight="bold" textAlign="center">
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
    );
  }

  return (
    <AuthShell>
      <div style={{ position: 'relative', minWidth: 440 }}>
        {step === 'email' && (
          <div
            style={{
              position: 'absolute',
              right: 'calc(100% + 40px)',
              top: 20,
              width: 240,
            }}
          >
            <Header variant="h2">Try AWS at no cost for up to 6 months</Header>
            <Box color="text-body-secondary" padding={{ top: 's' }}>
              Start with USD $100 in AWS credits, plus earn up to USD $100 by completing various activities.
            </Box>
          </div>
        )}
        <Container>
          <SpaceBetween size="l">
            {step === 'email' && (
              <>
                <Header variant="h1">Sign up for AWS</Header>
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
                  <Input value={name} onChange={({ detail }) => setName(detail.value)} placeholder="Enter your name" />
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
                <Box fontSize="heading-xl" fontWeight="bold">
                  Enter your contact details
                </Box>
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
  );
}
