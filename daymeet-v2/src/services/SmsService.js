import { Capacitor } from '@capacitor/core';

export const startSmsListener = (onSmsReceived) => {
  if (Capacitor.getPlatform() === 'android' && window.SMSReceive) {
    window.SMSReceive.startWatch(
      () => {
        console.log('Native SMS Watch started successfully');
        document.addEventListener('onSMSArrive', (e) => {
          const sms = e.data;
          onSmsReceived(sms.body, sms.address);
        });
      },
      (err) => console.log('Error starting SMS watch', err)
    );
  } else {
    console.log('SMS Receive native plugin not available on this platform. Simulating background listener...');
    // Mock incoming bank SMS for web/iOS testing after 5 seconds to demonstrate the Regex architecture
    setTimeout(() => {
      onSmsReceived('Dear Customer, Rs. 1499.00 has been debited from your HDFC Bank account ending in 4109 at Amazon.in.', 'HDFCBK');
    }, 5000);
  }
};

export const stopSmsListener = () => {
  if (Capacitor.getPlatform() === 'android' && window.SMSReceive) {
    window.SMSReceive.stopWatch(
      () => console.log('SMS Watch stopped'),
      (err) => console.log('Error stopping SMS watch', err)
    );
  }
};
