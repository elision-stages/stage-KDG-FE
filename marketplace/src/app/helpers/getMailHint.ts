export default function getMailHint(input: string) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'elision.eu', 'cronos.be', 'hotmail.be', 'msn.com', 'live.com', 'icloud.com', 'outlook.com']
  if(!input.includes('@')) return false
  const parts = input.split('@', 2)
  if(parts[1].length === 0 || parts[1].includes('.')) return false
  for(let domain of domains) {
    if(domain.startsWith(parts[1])) {
      return parts[0] + '@' + domain
    }
  }
  return false
}
