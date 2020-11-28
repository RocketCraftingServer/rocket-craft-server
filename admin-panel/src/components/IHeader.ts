
  export default interface IHeader  {

    windowGlobal: Window | any;
    paypal: any;
    optionsStyle: any;
    data(): any;
    switchTheme();
    changeTheme (themeEnu: string);
    mounted (): void;
    createPayPalDonateButton();
    showAboutDialogClick(): void;

  }
