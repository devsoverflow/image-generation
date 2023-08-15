const dateFormater = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Argentina/Buenos_Aires', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' });

export function toARGDate(date: Parameters<Intl.DateTimeFormat['format']>[0]) {
  return dateFormater.format(date);
}

export function pickRandom<T extends unknown[]>(arg:T) {
  return arg[Math.floor(Math.random() * arg.length)] as T[number];
}
