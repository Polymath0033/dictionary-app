export default interface Data {
  license: { name: string; url: string }[];
  word: string;
  phonetic: string;
  phonetics: { text: string; audio: string }[];
  meanings: {
    partOfSpeech: string;
    definitions: {
      definition: string;
      antonyms: string[];
      synonyms: string[];
      example: string;
    }[];
    antonyms: string[];
    synonyms: string[];
  }[];
  sourceUrls: string;
}
