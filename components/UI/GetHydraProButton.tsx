type GetHydraProButtonProps = {
  onPress?: () => void;
};

/**
 * This fork has no in-app purchases, so there is nothing to upgrade to.
 */
export default function GetHydraProButton({
  onPress: _onPress,
}: GetHydraProButtonProps) {
  return null;
}
