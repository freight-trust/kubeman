
export default class StringBuffer {
  buffer: string[] = []
  
  clear() {
    this.buffer = []
  }

  set(s: string) : this {
    this.clear()
    return this.append(s)
  }

  append(s: string) : this {
    this.buffer.push(s);
    return this;
  }

  contains(s: string) : boolean {
    let t = this.buffer.join("") 
    return t.includes(s)
  }

  split(s: string) : string[] {
    return this.toString().split(s)
  }
   
  toString() : string {
    return this.buffer.join("");
  }
}
