export const createOTPRawEmail = (otpCode: string): string => `Hi,

You've requested a One-Time Password (OTP) for authentication. Use it to authenticate:

OTP Code: ${otpCode}

Important:

This code is valid for a limited time and is for your use only.
Never share it with anyone or enter it on any website or form.
If you didn't request an OTP or have security concerns, please contact our support team immediately.

Thanks,

Systems Hub Team`;

export const createOtpHTMLEmail = (otpCode: string, otpExpiry: string): string => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your One-Time Password (OTP)</title>
    <style>
        body {
            font-family: sans-serif;
            margin: 0;
            padding: 0;
        }
        p {
            margin: 10px 0;
        }
        .important {
            font-weight: bold;
            color: red;
        }
    </style>
</head>
<body>
    <p>Hi,</p>
    <p>You've requested a One-Time Password (OTP) for authentication. Use it to authenticate:</p>
    <p style="font-size: 18px; font-weight: bold;">OTP Code: ${otpCode}</p>
    <p>This code is valid for <span class="important">**${otpExpiry} hour</span>** only.</p>
    
    <p>If you didn't request an OTP or have security concerns, please contact our support team immediately.</p>
    <p>Thanks,</p>
    <p>Systems Hub Team</p>
</body>
</html>
`;
