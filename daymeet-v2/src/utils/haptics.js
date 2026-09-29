import { Haptics, ImpactStyle } from '@capacitor/haptics';

/**
 * Global Haptic Engine for DayMeet OS
 * Provides consistent, physical tactile feedback across the interface.
 * Fails silently on unsupported devices (e.g., standard web browsers).
 */
export const triggerHaptic = async (style = 'light') => {
  try {
    switch (style) {
      case 'light':
        // For minor interactions: toggles, checkboxes, tab switching
        await Haptics.impact({ style: ImpactStyle.Light });
        break;
      case 'medium':
        // For standard buttons, modal opens, successful actions
        await Haptics.impact({ style: ImpactStyle.Medium });
        break;
      case 'heavy':
        // For destructive actions, errors, biometric failures
        await Haptics.impact({ style: ImpactStyle.Heavy });
        break;
      case 'success':
        // For completion of major tasks (fallback to medium if unsupported)
        await Haptics.impact({ style: ImpactStyle.Medium });
        break;
      case 'error':
        // For PIN failure, authentication failure
        await Haptics.impact({ style: ImpactStyle.Heavy });
        break;
      default:
        await Haptics.impact({ style: ImpactStyle.Light });
    }
  } catch (error) {
    // Fails silently on Web/Unsupported hardware
  }
};
