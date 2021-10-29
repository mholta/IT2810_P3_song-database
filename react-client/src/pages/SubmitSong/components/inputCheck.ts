export const isKeyArt = (key: string): boolean => {
  return RegExp(/^[CDEFGABHcdefgahb][bB#]?[mM]?$/).test(key.replace(/ /g, ''));
};

export const isLegalTime = (time: string): boolean => {
  return RegExp(/^([0-9]+\/[0-9]+(\+[0-9]+\/[0-9]+)*)$/).test(
    time.replace(/ /g, '')
  );
};

export const formatKey = (key: string): string => {
  if (!isKeyArt(key)) throw Error('key');
  return key
    .replace(/ /g, '')
    .toLowerCase()
    .replace(/^\w/, (match) => match.toUpperCase());
};

export const formatTime = (time: string): string => {
  if (!isLegalTime(time)) throw Error('time');
  return time.replace(/ /g, '').replace(/\+/g, ' + ');
};
