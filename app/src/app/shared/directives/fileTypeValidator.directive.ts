import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS, FormControl } from '@angular/forms';

@Directive({
  selector: '[FileTypeValidator]',
  providers: [
    {
      provide: NG_VALIDATORS, useExisting: FileTypeValidator, multi: true
    }
  ]
})

export class FileTypeValidator implements Validator {

  static validate(c: FormControl): { [key: string]: any } {
    if (c.value) {
      if (c.value[0]) {
        return FileTypeValidator.checkExtension(c);
      };
    }
  }

  private static checkExtension(c: FormControl) {
    let valToLower = c.value[0].name.toLowerCase();
    let regex = new RegExp("(.*?)\.(jpg|png|jpeg)$");
    let regexTest = regex.test(valToLower);
    return !regexTest ? { "notSupportedFileType": true } : null;
  }

  validate(c: FormControl): { [key: string]: any } {
    return FileTypeValidator.validate(c);
  }

}
