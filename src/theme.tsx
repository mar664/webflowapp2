import { buttonTheme } from "./themes/Buttons";
import { combolistTheme } from "./themes/Combolist";
import { formLabelTheme } from "./themes/FormLabel";
import { inputTheme } from "./themes/Input";
import { menuTheme } from "./themes/Menu";
import { modalTheme } from "./themes/Modal";
import { numberInputTheme } from "./themes/NumberInput";
import { radioTheme } from "./themes/Radio";
import { switchTheme } from "./themes/Switch";
import { tagTheme } from "./themes/Tag";
import { tooltipTheme } from "./themes/Tooltip";
import { StyleFunctionProps } from "@chakra-ui/react";

const colors = {
  header: {
    background: "var(--wf-designer--panelColorLight)",
    color: "var(--wf-designer--textColor)",
    button: {
      color: "rgb(171, 171, 171)",
      background: "transparent",
      _hover: {
        color: "rgb(246, 246, 246)",
        background: "rgb(255, 255, 255, 0.1)",
      },
    },
  },
  border: {
    panelColor: "rgb(54, 54, 54)",
  },
  inputField: {
    background: "rgb(43, 43, 43)",
    borderColor: "rgb(33, 33, 33)",
    color: "rgb(217, 217, 217)",
  },
  select: {
    background: "rgb(77, 77, 77)",
    borderColor: "rgb(54, 54, 54)",
  },
  dropdown: {
    background: "rgb(77, 77, 77)",
    borderColor: "rgb(54, 54, 54)",
    color: "rgb(235, 235, 235)",
    _hover: { color: "rgb(217, 217, 217)" },
  },
  button: {
    borderColor: "rgba(255, 255, 255, 0.14)",
    color: "#e0e0e0",
    background:
      "linear-gradient(rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",
    _hover: {
      background:
        "linear-gradient(rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
    },
  },
  tooltip: {
    borderColor: "rgb(33, 33, 33)",
    color: "rgb(54, 54, 54)",
    background: "rgb(235, 235, 235)",
  },
  switch: {
    track: {
      background: "rgb(159, 156, 156)",
      checked: { background: "rgb(0, 115, 230)" },
    },
  },
  accordion: {
    borderTopColor: "rgb(33, 33, 33)",
    borderBottomColor: "rgb(33, 33, 33)",

    heading: {
      background: "rgb(43, 43, 43)",
      borderBottomColor: "rgb(33, 33, 33)",
      color: "rgb(235, 235, 235)",
    },
  },
  alertDialog: {
    borderColor: "rgba(255, 255, 255, 0.13)",
    background: "#1e1e1e",
    color: "#f5f5f5",
    header: {
      borderColor: "rgba(255, 255, 255, 0.13)",
    },
  },
};

const fontSizes = {
  header: {
    fontSize: "var(--wf-designer--fontSize10)",
  },
  inputField: {
    fontSize: "11px",
  },
  label: {
    fontSize: "11px",
  },
  tooltip: {
    fontSize: "10px",
  },
  accordion: {
    heading: {
      button: { fontSize: "12px" },
    },
  },
  alertDialog: {
    header: {
      fontSize: "14px",
    },
    body: {
      fontSize: "14px",
    },
  },
};

const fonts = {
  heading:
    "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
  body: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
};

const fontWeights = {
  header: { fontWeight: "var(--wf-designer--fontHeadingWeight)" },
  accordion: {
    heading: {
      button: { fontWeight: "600" },
    },
  },
  alertDialog: {
    header: {
      fontWeight: "600",
    },
  },
};

const space = {
  header: {
    paddingLeft: "10px",
    paddingRight: "10px",
    button: {
      margin: "3px",
      padding: "3px",
    },
  },
  accordion: {
    panel: {
      padding: "0",
    },
    heading: {
      padding: "0",
      button: {
        paddingLeft: "8px",
        text: { marginLeft: "6px" },
      },
    },
  },
  alertDialog: {
    margin: "10px",
    header: {
      paddingLeft: "16px",
      paddingRight: "16px",
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
};

const sizes = {
  header: {
    height: "45px",
  },
  accordion: {
    heading: {
      height: "28px",
    },
  },
};

const borders = {};

const borderWidths = {
  dropdown: { borderWidth: "1px" },
  button: {
    borderWidth: "1px",
  },
  tooltip: {
    borderWidth: "1px",
  },
  accordion: {
    heading: {
      borderBottomWidth: "1px",
    },
  },
  alertDialog: {
    borderWidth: "1px",
    header: { borderBottomWidth: "1px" },
  },
};

const borderStyles = {};

const radii = {
  header: {
    button: {
      borderRadius: "2px",
      _hover: {
        borderRadius: "2px",
      },
    },
  },
  inputField: {
    borderRadius: "2px",
  },
  select: {
    borderRadius: "3px",
  },
  dropdown: {
    borderRadius: "3px",
  },

  button: {
    borderRadius: "4px",
  },
  tooltip: {
    borderRadius: "2px",
  },
  alertDialog: {
    borderRadius: "3px",
  },
};

const shadows = {
  dropdown: { boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 10px" },
  alertDialog: { boxShadow: "rgba(0, 0, 0, 0.3) 0px 1px 15px 0px" },
  inputField: { _focus: { boxShadow: "#007df0 0px 0px 0px 1px" } },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    html:
      props.colorMode === "dark"
        ? {
            bg: "rgb(43, 43, 43)",
            "--wf-designer--textColorLight": "#ebebeb",
            "--wf-designer--textColor": "#d9d9d9",
            "--wf-designer--textColorPreloader": "#ababab",
            "--wf-designer--textColorDim": "#ababab",
            "--wf-designer--textColorDimmer": "#757575",
            "--wf-designer--notificationTextColor": "#d9d9d9",
            "--wf-designer--panelColor": "#404040",
            "--wf-designer--panelColorLight": "#4d4d4d",
            "--wf-designer--panelColorLighter": "#5e5e5e",
            "--wf-designer--panelColorDark": "#2b2b2b",
            "--wf-designer--panelColorDarker": "#212121",
            "--wf-designer--panelBorder": "#212121",
            "--wf-designer--panelHeadDividerBorder":
              "1px solid var(--wf-designer--borderColorDark)",
            "--wf-designer--panelActiveShadow":
              "inset -1px 0px 0 0 #212121, -1px -1px 0 0 #212121, 0 2px 0 0 #404040",
            "--wf-designer--panelActiveShadowLast": "none",
            "--wf-designer--panelTabBackground":
              "var(--wf-designer--panelColorDark)",
            "--wf-designer--panelShadow":
              "inset -1px -1px 0 0 var(--wf-designer--borderColorDark)",
            "--wf-designer--panelShadowLast":
              "inset 0px -1px 0 0 var(--wf-designer--borderColorDark)",
            "--wf-designer--panelTabsShadow": "none",
            "--wf-designer--panelTabBarShadow":
              "0 -1px 0 0 var(--wf-designer--borderColorDark)",
            "--wf-designer--token-input-background-disabled": "#4d4d4d",
            "--wf-designer--token-input-text-disabled":
              "var(--wf-designer--textColorDim)",
            "--wf-designer--borderColor": "#363636",
            "--wf-designer--borderColorDark": "#212121",
            "--wf-designer--borderColorDarker": "#212121",
            "--wf-designer--insetColor": "#363636",
            "--wf-designer--insetBorderColor": "#2b2b2b",
            "--wf-designer--listColor": "#363636",
            "--wf-designer--listColorHover": "#2b2b2b",
            "--wf-designer--listBorderColor": "#2b2b2b",
            "--wf-designer--listSourceBorderColor": "#757575",
            "--wf-designer--listRowBackgroundHover":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--listRowSelectedBackground":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--listRowBorder":
              "1px solid var(--wf-designer--borderColorDark)",
            "--wf-designer--listRowBigHeight": "45px",
            "--wf-designer--listRowColorHover": "revert",
            "--wf-designer--listGridBorder":
              "1px solid var(--wf-designer--borderColor)",
            "--wf-designer--paneBorderColor":
              "var(--wf-designer--borderColorDark)",
            "--wf-designer--paneHeadHeight": "45px",
            "--wf-designer--paneCardColor":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--paneCardBorder":
              "1px solid var(--wf-designer--borderColor)",
            "--wf-designer--tooltipColor": "#ebebeb",
            "--wf-designer--tooltipColorText": "#212121",
            "--wf-designer--tooltipColorBlue": "#0073e6",
            "--wf-designer--tooltipColorBlueText": "white",
            "--wf-designer--canvasColor": "#5e5e5e",
            "--wf-designer--canvasColorDark": "#2b2b2b",
            "--wf-designer--canvasColorDarker": "#212121",
            "--wf-designer--breadcrumbColor": "#ebebeb",
            "--wf-designer--breadcrumbTextColor": "#4d4d4d",
            "--wf-designer--breadcrumbRulerColor":
              "var(--wf-designer--breadcrumbTextColor)",
            "--wf-designer--popoverBackground":
              "var(--wf-designer--panelColor)",
            "--wf-designer--popoverHeaderBackground":
              "var(--wf--designer--panelColorLight)",
            "--wf-designer--popoverShadow": "0px 1px 15px rgba(0, 0, 0, 0.2)",
            "--wf-designer--popoverBorder":
              "1px solid var(--wf-designer--borderColor)",
            "--wf-designer--popoverShadowHard":
              "0 0 0 1px var(--wf-designer--borderColor), var(--wf-designer--popoverShadow)",
            "--wf-designer--menuBackground":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--menuBorder": "var(--wf-designer--popoverBorder)",
            "--wf-designer--menuCardOffset": "-1px",
            "--wf-designer--menuCardTopBorderRadius": "0px",
            "--wf-designer--menuDividerColor":
              "var(--wf-designer--borderColorDark)",
            "--wf-designer--menuItemPadding": "4px 15px",
            "--wf-designer--menuItemLineHeight": "19px",
            "--wf-designer--menuItemHoverBackground":
              "var(--wf-designer--panelColorLighter)",
            "--wf-designer--menuItemHoverColor": "white",
            "--wf-designer--menuItemCaretOffset": "0px",
            "--wf-designer--modalBackground": "var(--wf-designer--panelColor)",
            "--wf-designer--modalHeaderBackground":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--modalHeaderHeight": "42px",
            "--wf-designer--modalPadding": "16px",
            "--wf-designer--modalShadow":
              "0 0 0 1px rgba(0, 0, 0, 0.3), 0 4px 24px rgba(0, 0, 0, 0.2)",
            "--wf-designer--miniSettingsModalBackground":
              "var(--wf-designer--modalBackground)",
            "--wf-designer--maskCanvas": "rgba(0, 0, 0, 0.75)",
            "--wf-designer--maskPanel": "rgba(33, 33, 33, 0.85)",
            "--wf-designer--maskLoading": "rgba(33, 33, 33, 0.95)",
            "--wf-designer--notificationColor": "rgba(33, 33, 33, 0.95)",
            "--wf-designer--pillBackground":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--buttonText": "white",
            "--wf-designer--buttonGroupBackground": "transparent",
            "--wf-designer--buttonColor": "#5e5e5e",
            "--wf-designer--buttonColorHover": "#757575",
            "--wf-designer--buttonColorActive": "#5e5e5e",
            "--wf-designer--buttonBorder": "1px solid #363636",
            "--wf-designer--buttonBoxShadow": "none",
            "--wf-designer--buttonBlue": "#0073e6",
            "--wf-designer--buttonBlueHover": "#0084ff",
            "--wf-designer--buttonGreen": "#008547",
            "--wf-designer--buttonGreenHover": "#00944f",
            "--wf-designer--buttonRed": "#cf313b",
            "--wf-designer--buttonRedHover": "#db434c",
            "--wf-designer--buttonOrange": "#c75300",
            "--wf-designer--buttonOrangeHover": "#dd7124",
            "--wf-designer--buttonPurple": "#7f5ae9",
            "--wf-designer--buttonPurpleHover": "#8a61ff",
            "--wf-designer--buttonHeadHeight": "29px",
            "--wf-designer--buttonHeadLineHeight": "26px",
            "--wf-designer--classShadow": "0 0 0 1px rgba(0, 0, 0, 0.15)",
            "--wf-designer--inputColor": "#2b2b2b",
            "--wf-designer--inputColorHover": "#212121",
            "--wf-designer--inputBorderColor": "#212121",
            "--wf-designer--inputBorderColorHover": "#212121",
            "--wf-designer--inputBoxShadow": "0 0 0 rgba(0, 0, 0, 0)",
            "--wf-designer--inputPreviewColor": "#ababab",
            "--wf-designer--inputPreviewBorderColor": "#5e5e5e",
            "--wf-designer--inputPreviewBg": "#4d4d4d",
            "--wf-designer--inputHeighlightColor": "white",
            "--wf-designer--inputHeighlightBorderColor":
              "rgba(138, 194, 255, 0.8)",
            "--wf-designer--inputHeighlightBg": "rgba(138, 194, 255, 0.35)",
            "--wf-designer--inputTickWidth": "24px",
            "--wf-designer--inputPaddingX": "9px",
            "--wf-designer--inputPaddingY": "8px",
            "--wf-designer--switchColor": "var(--wf-designer--panelColorDark)",
            "--wf-designer--switchKnobColor": "var(--wf-designer--buttonColor)",
            "--wf-designer--switchKnobColorHover":
              "var(--wf-designer--buttonColorHover)",
            "--wf-designer--switchBorderColor":
              "var(--wf-designer--borderColorDark)",
            "--wf-designer--switchActiveColor": "#0073e6",
            "--wf-designer--switchActiveBorderColor": "#212121",
            "--wf-designer--switchWidth": "40px",
            "--wf-designer--inputNoticeColor": "#b99f76",
            "--wf-designer--inputNoticeBorderColor": "#9e8863",
            "--wf-designer--inputNoticeBg": "#6f6452",
            "--wf-designer--checkboxBorderColor":
              "var(--wf-designer--inputBorderColor)",
            "--wf-designer--checkboxCheckedBackgroundColor":
              "var(--wf-designer--inputColor)",
            "--wf-designer--checkboxCheckedBorderColor":
              "var(--wf-designer--inputBorderColor)",
            "--wf-designer--checkboxLabelColor": "currentColor",
            "--wf-designer--checkboxSize": "14px",
            "--wf-designer--checkboxVerticalAlign": "baseline",
            "--wf-designer--checkboxTopOffset": "0",
            "--wf-designer--checkboxMarginRight": "8px",
            "--wf-designer--inputOutlineFocus":
              "var(--wf-designer--inputBoxShadow), 0 0 0 1px #2496ff",
            "--wf-designer--inputOutlineFocusPurple":
              "var(--wf-designer--inputBoxShadow), 0 0 0 1px #a484ff",
            "--wf-designer--inputOutlineFocusError":
              "var(--wf-designer--inputBoxShadow), 0 0 0 1px #ed273e",
            "--wf-designer--inputOutlineFocusErrorLight":
              "var(--wf-designer--inputBoxShadow), 0 0 0 1px #ff424d",
            "--wf-designer--fontDefault":
              "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif",
            "--wf-designer--fontHeading": "var(--wf-designer--fontDefault)",
            "--wf-designer--fontHeadingWeight": "400",
            "--wf-designer--fontCode":
              "'SF Mono', 'Liberation Mono', Inconsolata, Consolas, Monaco, Menlo, monospace",
            "--wf-designer--modalTitleSize": "26px",
            "--wf-designer--modalTitleWeight": "400",
            "--wf-designer--inputHeight": "24px",
            "--wf-designer--buttonHeight": "22px",
            "--wf-designer--buttonLineHeight": "30px",
            "--wf-designer--buttonGroupHeight": "25px",
            "--wf-designer--controlFontSize": "11px",
            "--wf-designer--inputFontSize": "12px",
            "--wf-designer--controlBigHeight": "32px",
            "--wf-designer--controlBigFontSize": "12px",
            "--wf-designer--radius": "2px",
            "--wf-designer--radiusMedium": "3px",
            "--wf-designer--radiusRound": "100px",
            "--wf-designer--radiusButtonGroup": "0px",
            "--wf-designer--disabledOpacity": "0.5",
            "--wf-designer--datePickerWidth": "254px",
            "--wf-designer--scrollbarBaseColor": "#4d4d4d #2b2b2b",
            "--wf-designer--scrollbarTrackColor":
              "var(--wf-designer--panelColorDark)",
            "--wf-designer--scrollbarTrackBorderColor":
              "var(--wf-designer--borderColorDark)",
            "--wf-designer--scrollbarThumbColor":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--scrollbarThumbColorHover":
              "var(--wf-designer--buttonColor)",
            "--wf-designer--scrollbarThumbColorDisabled":
              "var(--wf-designer--panelColor)",
            "--wf-designer--webkitScrollBarWidth": "10px",
            "--wf-designer--cssTokenHeight": "23px",
            "--wf-designer--rightSidebarBorderWidth": "1px",
            "--wf-designer--rightSidebarWidthInner": "240px",
            "--wf-designer--rightSidebarWidth": "calc(241px)",
            "--wf-designer--rightSidebarWidthPlusScrollbar": "calc(251px)",
            "--wf-designer--rightSidebarPanelWidth": "224px",
            "--wf-designer--bottomBarHeight": "29px",
            "--wf-designer--leftSidebarSpacerDisplay": "block",
            "--wf-designer--leftSidebarSpacerOffsetLeft": "0px",
            "--wf-designer--leftSidebarWidth": "35px",
            "--wf-designer--leftSidebarBorderColor": "#212121",
            "--wf-designer--leftSidebarBorderDisplay": "block",
            "--wf-designer--leftSidebarButtonBorderColor": "#363636",
            "--wf-designer--leftSidebarButtonActiveBackground":
              "var(--wf-designer--panelColorLight)",
            "--wf-designer--leftSidebarButtonActiveBorder":
              "var(--wf-designer--borderColorDark)",
            "--wf-designer--leftSidebarButtonActiveLeftBorder":
              "1px solid transparent",
            "--wf-designer--leftSidebarButtonPadding": "11px",
            "--wf-designer--leftSidebarBottomButtonPadding": "7px",
            "--wf-designer--leftSidebarButtonBackgroundHover": "transparent",
            "--wf-designer--leftSidebarHelpTriggerPadding": "4px",
            "--wf-designer--leftSidebarDividerOffset": "-4px",
            "--wf-designer--leftSidebarDividerMargin": "0px",
            "--wf-designer--topBarHeight":
              "var(--wf-designer--leftSidebarWidth)",
            "--wf-designer--topBarIconActiveBackground": "#212121",
            "--wf-designer--topBarIconActiveColor": "currentColor",
            "--wf-designer--topBarBorderColor":
              "var(--wf-designer--borderColor)",
            "--wf-designer--tabHeight": "var(--wf-designer--topBarHeight)",
            "--wf-designer--leftSidebarSpacerWidth": "6px",
            "--wf-designer--slateHeaderHeight": "44px",
            "--wf-designer--firstSlatePanelWidth": "250px",
            "--wf-designer--secondSlatePanelWidth": "400px",
            "--wf-designer--sectionPadding": "0 10px 0 4px",
            "--wf-designer--sectionHeaderPaddingLeft": "5px",
            "--wf-designer--sectionClosedBorderBottom": "none",
            "--wf-designer--sectionOpenedBorderBottom":
              "1px solid var(--wf-designer--borderColorDark)",
            "--wf-designer--sectionTitleHeight": "28px",
            "--wf-designer--sectionTitleBorderBottom":
              "1px solid var(--wf-designer--borderColorDark)",
            "--wf-designer--fontSize0": "10px",
            "--wf-designer--fontSize1": "11px",
            "--wf-designer--fontSize2": "12px",
            "--wf-designer--fontSize3": "13px",
            "--wf-designer--fontSize4": "14px",
            "--wf-designer--fontSize5": "15px",
            "--wf-designer--fontSize6": "16px",
            "--wf-designer--fontSize8": "18px",
            "--wf-designer--fontSize10": "20px",
            "--wf-designer--fontWeightMedium": "500",
          }
        : {
            //
            bg: "rgb(43, 43, 43)",
            "--wf-designer--textColorLight":
              "var(--chart-data-series-d2-gray-0, #f5f5f5)",
            "--wf-designer--textColor":
              "var(--chart-data-series-d2-gray-0, #f5f5f5)",
            "--wf-designer--textColorPreloader":
              "var(--chart-data-series-d2-gray-500, #a3a3a3)",
            "--wf-designer--textColorDim":
              "var(--chart-data-series-d2-gray-500, #a3a3a3)",
            "--wf-designer--textColorDimmer":
              "var(--chart-data-series-d2-gray-500, #a3a3a3)",
            "--wf-designer--notificationTextColor":
              "var(--chart-data-series-d2-gray-0, #f5f5f5)",
            "--wf-designer--panelColor":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--panelColorLight":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--panelColorLighter":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--panelColorDark":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--panelBorder": "rgba(255, 255, 255, 0.13)",
            "--wf-designer--panelHeadDividerBorder": "none",
            "--wf-designer--panelShadow": "none",
            "--wf-designer--panelShadowLast": "none",
            "--wf-designer--panelTabBackground": "transparent",
            "--wf-designer--panelTabsShadow":
              "0 -1px 0 0 rgba(255, 255, 255, 0.13) inset",
            "--wf-designer--panelTabBarShadow":
              "0 -1px 0 0 rgba(255, 255, 255, 0.13)",
            "--wf-designer--panelActiveShadow":
              "0 -1px 0 var(--chart-data-series-d2-gray-500, #a3a3a3) inset",
            "--wf-designer--panelActiveShadowLast":
              "var(--wf-designer--panelActiveShadow)",
            "--wf-designer--token-input-background-disabled":
              "var(--chart-data-series-d2-gray-100, #ebebeb)",
            "--wf-designer--token-input-text-disabled":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--borderColor": "rgba(255, 255, 255, 0.14)",
            "--wf-designer--borderColorDark": "rgba(255, 255, 255, 0.13)",
            "--wf-designer--borderColorDarker": "rgba(255, 255, 255, 0.13)",
            "--wf-designer--listColor":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--listColorHover":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--listBorderColor": "rgba(255, 255, 255, 0.14)",
            "--wf-designer--listSourceBorderColor": "rgba(255, 255, 255, 0.19)",
            "--wf-designer--listRowBackgroundHover":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--listRowSelectedBackground":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--listRowBorder": "none",
            "--wf-designer--listRowBigHeight": "32px",
            "--wf-designer--listGridBorder": "none",
            "--wf-designer--listRowColorHover":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--paneHeadHeight": "40px",
            "--wf-designer--paneCardColor":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--paneCardBorder": "1px solid transparent",
            "--wf-designer--tooltipColor":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--tooltipColorText":
              "var(--chart-data-series-d2-gray-400, #bdbdbd)",
            "--wf-designer--canvasColor":
              "var(--chart-data-series-d2-gray-800, #444444)",
            "--wf-designer--canvasColorDark":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--canvasColorDarker":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--breadcrumbColor":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--breadcrumbTextColor":
              "var(--chart-data-series-d2-gray-400, #bdbdbd)",
            "--wf-designer--breadcrumbRulerColor": "rgba(255, 255, 255, 0.19)",
            "--wf-designer--popoverBackground":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--popoverHeaderBackground":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--popoverShadow":
              "0px 2px 6px rgba(0, 0, 0, 0.08), 0px 4px 8px 2px rgba(0, 0, 0, 0.08), 0px 8px 16px 4px rgba(0, 0, 0, 0.08), 0px 12px 24px 8px rgba(0, 0, 0, 0.08), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.12), inset 0px -0.5px 0.5px rgba(0, 0, 0, 0.12)",
            "--wf-designer--popoverBorder": "none",
            "--wf-designer--menuBackground":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--menuBorder": "none",
            "--wf-designer--menuCardOffset": "4px",
            "--wf-designer--menuCardTopBorderRadius":
              "var(--wf-designer--radius)",
            "--wf-designer--menuDividerColor": "rgba(255, 255, 255, 0.13)",
            "--wf-designer--menuItemPadding": "3px 8px",
            "--wf-designer--menuItemLineHeight": "18px",
            "--wf-designer--menuItemHoverBackground":
              "var(--chart-data-series-d2-gray-800, #444444)",
            "--wf-designer--menuItemHoverColor":
              "var(--chart-data-series-d2-gray-0, #f5f5f5)",
            "--wf-designer--menuItemCaretOffset": "0px",
            "--wf-designer--modalBackground":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--modalHeaderBackground": "transparent",
            "--wf-designer--modalHeaderHeight": "32px",
            "--wf-designer--modalPadding": "8px",
            "--wf-designer--modalShadow": "var(--wf-designer--popoverShadow)",
            "--wf-designer--miniSettingsModalBackground":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--maskCanvas": "rgba(0, 0, 0, 0.6)",
            "--wf-designer--maskPanel": "rgba(0, 0, 0, 0.6)",
            "--wf-designer--maskLoading": "rgba(0, 0, 0, 0.8)",
            "--wf-designer--notificationColor": "rgba(0, 0, 0, 0.8)",
            "--wf-designer--pillBackground": "rgba(255, 255, 255, 0.1)",
            "--wf-designer--buttonText":
              "var(--chart-data-series-d2-gray-0, #f5f5f5)",
            "--wf-designer--buttonColor":
              "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",
            "--wf-designer--buttonColorHover":
              "linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0.16) 100%)",
            "--wf-designer--buttonColorActive":
              "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.1) 100%)",
            "--wf-designer--buttonBorder": "none",
            "--wf-designer--buttonBoxShadow":
              "0px 0.5px 1px rgba(0, 0, 0, 0.8), inset 0px 0.5px 0.5px rgba(255, 255, 255, 0.12)",
            "--wf-designer--buttonHeadHeight":
              "var(--wf-designer--controlBigHeight)",
            "--wf-designer--buttonHeadLineHeight": "1",
            "--wf-designer--inputColor": "rgba(0, 0, 0, 0.15)",
            "--wf-designer--inputColorHover": "rgba(0, 0, 0, 0.15)",
            "--wf-designer--inputBorderColor": "rgba(255, 255, 255, 0.14)",
            "--wf-designer--inputBorderColorHover": "rgba(255, 255, 255, 0.19)",
            "--wf-designer--inputBoxShadow":
              "0px 1px 1px -1px rgba(0, 0, 0, 0.13) inset, 0px 3px 3px -3px rgba(0, 0, 0, 0.17) inset, 0px 4px 4px -4px rgba(0, 0, 0, 0.17) inset, 0px 8px 8px -8px rgba(0, 0, 0, 0.17) inset, 0px 12px 12px -12px rgba(0, 0, 0, 0.13) inset, 0px 16px 16px -16px rgba(0, 0, 0, 0.13) inset",
            "--wf-designer--inputTickWidth": "16px",
            "--wf-designer--inputPaddingX": "9px",
            "--wf-designer--inputPaddingY": "4px",
            "--wf-designer--switchColor":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--switchKnobColor":
              "var(--chart-data-series-d2-white, #ffffff)",
            "--wf-designer--switchKnobColorHover":
              "var(--chart-data-series-d2-white, #ffffff)",
            "--wf-designer--switchActiveColor":
              "var(--chart-data-series-d2-blue-300, #006acc)",
            "--wf-designer--switchActiveBorderColor":
              "var(--chart-data-series-d2-blue-300, #006acc)",
            "--wf-designer--switchWidth": "28px",
            "--wf-designer--checkboxCheckedBackgroundColor":
              "var(--chart-data-series-d2-blue-300, #006acc)",
            "--wf-designer--checkboxCheckedBorderColor":
              "var(--chart-data-series-d2-blue-300, #006acc)",
            "--wf-designer--checkboxBorderColor": "rgba(255, 255, 255, 0.19)",
            "--wf-designer--checkboxLabelColor":
              "var(--chart-data-series-d2-gray-400, #bdbdbd)",
            "--wf-designer--checkboxSize": "12px",
            "--wf-designer--checkboxVerticalAlign": "middle",
            "--wf-designer--checkboxTopOffset": "-1px",
            "--wf-designer--checkboxMarginRight": "4px",
            "--wf-designer--fontHeadingWeight": "600",
            "--wf-designer--modalTitleWeight": "600",
            "--wf-designer--inputHeight": "24px",
            "--wf-designer--buttonLineHeight": "24px",
            "--wf-designer--controlBigHeight": "24px",
            "--wf-designer--controlBigFontSize": "11px",
            "--wf-designer--radius": "4px",
            "--wf-designer--radiusMedium": "4px",
            "--wf-designer--scrollbarBaseColor":
              "var(--chart-data-series-d2-gray-800, #444444) var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--scrollbarTrackColor":
              "var(--chart-data-series-d2-gray-1200, #1e1e1e)",
            "--wf-designer--scrollbarTrackBorderColor":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--scrollbarThumbColor":
              "var(--chart-data-series-d2-gray-700, #5e5e5e)",
            "--wf-designer--scrollbarThumbColorHover":
              "var(--chart-data-series-d2-gray-600, #6d6d6d)",
            "--wf-designer--scrollbarThumbColorDisabled":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--webkitScrollBarWidth": "10px",
            "--wf-designer--leftSidebarSpacerWidth": "0px",
            "--wf-designer--leftSidebarSpacerDisplay": "none",
            "--wf-designer--leftSidebarSpacerOffsetLeft": "-1px",
            "--wf-designer--leftSidebarBorderColor":
              "rgba(255, 255, 255, 0.13)",
            "--wf-designer--leftSidebarButtonBorderColor":
              "rgba(255, 255, 255, 0.13)",
            "--wf-designer--leftSidebarButtonActiveBackground":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--leftSidebarButtonActiveBorder": "transparent",
            "--wf-designer--leftSidebarBorderDisplay": "none",
            "--wf-designer--leftSidebarButtonActiveLeftBorder": "none",
            "--wf-designer--leftSidebarButtonPadding": "8px",
            "--wf-designer--leftSidebarBottomButtonPadding":
              "var(--wf-designer--leftSidebarButtonPadding)",
            "--wf-designer--leftSidebarButtonBackgroundHover":
              "var(--chart-data-series-d2-gray-1100, #2e2e2e)",
            "--wf-designer--leftSidebarHelpTriggerPadding":
              "var(--wf-designer--leftSidebarBottomButtonPadding)",
            "--wf-designer--leftSidebarDividerOffset": "-6px",
            "--wf-designer--leftSidebarDividerMargin": "10px",
            "--wf-designer--topBarIconActiveBackground":
              "var(--chart-data-series-d2-gray-1000, #383838)",
            "--wf-designer--topBarIconActiveColor":
              "var(--chart-data-series-d2-gray-0, #f5f5f5)",
            "--wf-designer--topBarBorderColor": "transparent",
            "--wf-designer--sectionPadding": "0 8px",
            "--wf-designer--sectionHeaderPaddingLeft": "0",
            "--wf-designer--sectionClosedBorderBottom":
              "1px solid var(--wf-designer--borderColorDark)",
            "--wf-designer--sectionOpenedBorderBottom":
              "1px solid var(--wf-designer--borderColorDark)",
            "--wf-designer--sectionTitleHeight": "40px",
            "--wf-designer--sectionTitleBorderBottom": "none",
            "--wf-designer--fontSize0": "11.5px",
            "--wf-designer--fontSize1": "11.5px",
            "--wf-designer--fontSize2": "11.5px",
            "--wf-designer--fontSize3": "11.5px",
            "--wf-designer--fontSize4": "12.5px",
            "--wf-designer--fontSize5": "12.5px",
            "--wf-designer--fontSize6": "12.5px",
            "--wf-designer--fontSize8": "12.5px",
            "--wf-designer--fontSize10": "12.5px",
            "--wf-designer--fontWeightMedium": "600",
            //
          },
    // styles for the `body`
    body: {
      maxWidth: "100%",
      bg: "#404040",
      color: "white",
      overflowX: "hidden",
    },
  }),
};

export default {
  styles,
  colors,
  borders,
  space,
  sizes,
  borderWidths,
  borderStyles,
  fontSizes,
  fonts,
  radii,
  shadows,
  fontWeights,
  components: {
    Button: buttonTheme,
    Switch: switchTheme,
    NumberInput: numberInputTheme,
    FormLabel: formLabelTheme,
    Input: inputTheme,
    Radio: radioTheme,
    Tag: tagTheme,
    Combolist: combolistTheme,
    Menu: menuTheme,
    Tooltip: tooltipTheme,
    Modal: modalTheme,
  },
};
