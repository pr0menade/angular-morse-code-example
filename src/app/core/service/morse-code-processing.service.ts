import {Inject, Injectable} from '@angular/core';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/timer';

import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import {
  MorseCharacters,
  MorseTimeRanges,
  MorseTranslations
} from '../token/injection-tokens';

@Injectable()
export class MorseCodeProcessingService {

  private _startEvents$: Subject<number> = new Subject();
  get startEvents$(): Observable<number> {
    return this._startEvents$.asObservable();
  }

  public morseChar$: Observable<any>;

  public morseSymbol$: Observable<any>;

  public morseLetter$: Observable<any>;

  constructor(
    @Inject(MorseTimeRanges) private mR,
    @Inject(MorseCharacters) private mC,
    @Inject(MorseTranslations) private mT
  ) {

  }

  sendStartTime(timestamp: number): void {
    // space for validation
    this._startEvents$.next(timestamp);
  }

  sendStopTime(timestamp: number): void {
    // space for validation
  }

  injectMorseChar(char: string) {
    // space for validation
  }

  // custom operators -----------------------------------

  private safeTranslate(source: Observable<string>): Observable<any> {
    return null
  }

  // helpers --------------------------------------------

  private toTimeDiff = (arr: number[]): number => {
    return arr[1] - arr[0]
  }

  private translateSymbolToLetter = (symbol: string): string => {
    const result = this.mT
      .find(i => i.symbol === symbol)
    if (result) {
      return result.char
    }

    throw new Error(`Translation Error: Could not translate morse symbol ${symbol} to a letter`)
  }

  private msToMorseChar = (ms: number): string => {
    if (ms >= 0) {
      return (ms > this.mR.shortMorse) ? this.mC.longMorse : this.mC.shortMorse
    } else {
      return (ms >= this.mR.shortBreak) ? this.mC.shortBreak : this.mC.longBreak
    }
  }

  private charArrayToSymbol = (arr: string[]): string => {
    return arr.filter((v) => v !== this.mC.longBreak).join('')
  }

  // used to show how to not handle an error
  private isMorseSymbol = (symbol: string): boolean => {
    return !!this.mT
      .map(i => i.symbol)
      .find(str => str === symbol)
  }

  private isCharNoShortBreak = (char: string): boolean => {
    return char !== this.mC.shortBreak
  }

  private isCharLongBreak = (char: string): boolean => {
    return char === this.mC.longBreak
  }

}