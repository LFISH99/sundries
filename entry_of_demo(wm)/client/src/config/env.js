let endpoint = process.env.NODE_ENV === 'development' ? 'http://10.7.144.24:8080' : document.location.origin;
let trustedDomainFullName = document.location.href.split('#')[0];

export {
  endpoint,
  trustedDomainFullName
}
