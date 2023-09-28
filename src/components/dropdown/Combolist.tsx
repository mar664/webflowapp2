import {
  Box,
  createStylesContext,
  forwardRef,
  useMultiStyleConfig,
  useStyleConfig,
} from "@chakra-ui/react";

const [StylesProvider, useStyles] = createStylesContext("Combolist");

export const Combolist = forwardRef(({ ...props }, ref) => {
  const { size, variant, children, ...rest } = props;

  // 2. Consume the `useMultiStyleConfig` hook
  const styles = useMultiStyleConfig("Combolist", { size, variant });

  return (
    <Box as="ul" __css={styles.combolist} {...rest} ref={ref}>
      {/* 3. Mount the computed styles on `StylesProvider` */}
      <StylesProvider value={styles}>{children}</StylesProvider>
    </Box>
  );
});

export const CombolistItem = forwardRef(({ variant, ...props }, ref) => {
  const styles = useStyles();
  const individualStyles = useStyleConfig("CombolistItem", { variant });

  return (
    <Box
      as="li"
      __css={variant ? { ...styles.item, ...individualStyles } : styles.item}
      {...props}
      ref={ref}
    />
  );
});
