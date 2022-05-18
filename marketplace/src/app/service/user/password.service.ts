import { Injectable } from '@angular/core'
import sha1 from 'js-sha1'
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PasswordService {
  url: string = 'https://api.pwnedpasswords.com/range/'
  request
  cache: {[key: string]: number} = {}

  constructor(private http: HttpClient) { }

  cancel() {
    if(this.request) this.request.unsubscribe()
    return this
  }

  checkPassword(password: string): Promise<number> {
    return new Promise((resolve, reject) => {
      if(password in this.cache) return resolve(this.cache[password])
      const hash = sha1(password).toUpperCase()
      this.request = this.http.get(
        this.url + hash.substring(0, 5),
        {responseType: 'text'}
      ).subscribe({
        next: (data) => {
          const lines = data.split(/\r?\n/)
          this.cache[password] = 0
          for (const line of lines) {
            if (line.startsWith(hash.substring(5))) {
              this.cache[password] = parseInt(line.split(':')[1])
              break;
            }
          }
          resolve(this.cache[password])
        }, error: (error) => {
          reject(error)
        }
      })
    })
  }
}
