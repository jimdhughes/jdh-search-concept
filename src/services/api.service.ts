export function get(url: string): Promise<any> {
  return fetch(url).then(res => res.json());
}
