import type * as TokensNamespace from './design-tokens';

type TokenName = keyof typeof TokensNamespace;

export const comments: { readonly [key in TokenName]: string } = {
    actionColorRgbPartial: '',
    applicationBackgroundColor: 'Background color for the application.',
    fillColorSelected: '',
    fillColorSelectedRgbPartial: '',
    fillColorSelectedHover: '',
    fillColorHover: '',
    borderColor: '',
    borderColorRgbPartial: '',
    failColor: '',
    warningColor: '',
    passColor: '',
    borderColorHover: '',
    iconColor: '',
    popupBoxShadowColor: '',
    popupBorderColor: '',
    controlHeight: '',
    standardPadding: '',
    labelHeight: '',
    borderWidth: '',
    iconSize: '',
    drawerWidth: '',
    fontFamily: '',
    labelFontFamily: '',
    groupLabelFontFamily: '',
    drawerHeaderFontFamily: '',
    labelFontSize: '',
    contentFontSize: '',
    groupLabelFontSize: '',
    drawerHeaderFontSize: '',
    groupLabelFontWeight: '',
    labelFontWeight: '',
    labelFontColor: '',
    groupLabelFontColor: '',
    contentFontColor: '',
    buttonContentFontColor: '',
    labelFontColorDisabled: '',
    labelTextTransform: '',
    groupLabelTextTransform: '',
    contentFontColorDisabled: '',
    smallDelay: '',
    mediumDelay: '',
    drawerAnimationDurationMs: ''
};