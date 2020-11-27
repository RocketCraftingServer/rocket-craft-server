
import LocalStorageMemory from "./local-storage/local-storage";

export default interface IApp {

  /**
   * @description `ls` is instance for localstorage operation
   * I will use it like singletone for injection in places
   * where is needed.
   */
  ls: LocalStorageMemory

  /**
   * @description Additional declaration is needed.
   * When you declare some properties in `Component` decorator.
   * count!: number
   * increment!: () => void
   */
  count: number;

  cookieAccept: () => void;
  styleObject: any;

  /**
   * @description options are main object
   * for user in fly setup. If user clear
   * cache memory(localStorege) everything
   * goes back to the default values.
   */
  options: Object;
  
  currentRoute: any;
  setupInstance(): void;
  computedMsg: string
  mounted(): void
}
