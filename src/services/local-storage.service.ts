import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

localStorageInit(key: string): void {
  if (!localStorage.getItem(key)) {
    localStorage.setItem(key, JSON.stringify([])); 
  }
}

addValueToArray(key: string, value: string): void {
  const storedData = JSON.parse(localStorage.getItem(key) || '[]'); 
  if (!storedData.includes(value)) { 
    storedData.push(value); 
    localStorage.setItem(key, JSON.stringify(storedData)); 
  }
}

removeValueFromArray(key: string, value: string): void {
  try {
  const storedData = JSON.parse(localStorage.getItem(key) || '[]');
  const updatedData = storedData.filter((item: string) => item !== value); 
  localStorage.setItem(key, JSON.stringify(updatedData));
} catch(error) {
  return console.log(error)
}
}

getAllValues(key: string): string[] {
  try {
  const data =  JSON.parse(localStorage.getItem(key) || '[]');
  return data
  }
  catch (error) {
          console.error(error + " Error from local-storage service 'getAllValues'");
          return [];
        }
  } 


  removeAllValues(key: string): void {
    try {
      let storedData = JSON.parse(localStorage.getItem(key) || '[]');
      storedData = [];
      localStorage.setItem(key, JSON.stringify(storedData));
    }
    catch (error) {
      throwError(() => {
        error
      })
    }
  }
}