import { Icon } from "@chakra-ui/icon";
import { PropsOf, SystemStyleObject } from "@chakra-ui/system";
import { cx } from "@chakra-ui/shared-utils";
import { useAccordionItemState, useAccordionStyles } from "@chakra-ui/react";
import { useAccordionContext } from "@chakra-ui/react";

export type AccordionIconProps = PropsOf<typeof Icon>;

/**
 * AccordionIcon that gives a visual cue of the open/close state of the accordion item.
 * It rotates `180deg` based on the open/close state.
 */

export function AccordionIcon(props: AccordionIconProps) {
  const { isOpen, isDisabled } = useAccordionItemState();
  const { reduceMotion } = useAccordionContext();

  const _className = cx("chakra-accordion__icon", props.className);
  const styles = useAccordionStyles();

  const iconStyles: SystemStyleObject = {
    opacity: isDisabled ? 0.4 : 1,
    transform: isOpen ? "rotate(360deg)" : "rotate(-90deg)",
    transition: undefined,
    transformOrigin: "center",
    ...styles.icon,
  };

  return (
    <Icon
      viewBox="0 0 24 24"
      aria-hidden
      className={_className}
      __css={iconStyles}
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"
      />
    </Icon>
  );
}

AccordionIcon.displayName = "AccordionIcon";
