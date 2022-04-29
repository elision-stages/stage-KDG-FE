export default function getMailHint(input: string) {
  const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'aol.com', 'elision.eu', 'cronos.be', 'hotmail.be', 'msn.com', 'live.com', 'icloud.com', 'outlook.com']
  if(!input.includes('@')) return false
  const parts = input.split('@', 2)
  if(parts[1].length === 0 || parts[1].includes('.')) return false
  const result = domains.find(domain => domain.startsWith(parts[1]))
  if(result) return parts[0] + '@' + result
  return false
}
