import { Haptics, ImpactStyle } from '@capacitor/haptics';

export function useInteraction() {
  const triggerHaptic = () => {
    Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
  };

  const interact = (actionName) => {
    triggerHaptic();
    console.log(`Interaction: ${actionName}`);
  };

  return { triggerHaptic, interact };
}
