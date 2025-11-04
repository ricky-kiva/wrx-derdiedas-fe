import React, { type JSX } from 'react';

interface GenderRowData {
  condition: string,
  examples: string[]
}

const masculineRowData: GenderRowData[] = [
  { condition: 'Male People', examples: [ 'der Mann (man)', 'der Vater (father)' ] },
  { condition: 'Seasons', examples: [ 'der Herbst (fall)', 'der Winter (winter)' ] },
  { condition: 'Precipitations', examples: [ 'der Regen (rain)', 'der Schnee (snow)' ] },
  { condition: 'Date & Time Periods', examples: [ 'der Tag (day)', 'der Abend (evening)' ] },
  { condition: 'Most -ling Endings', examples: [ 'der Zwilling (twin)', 'der Teigling (dough)' ] },
  { condition: 'Most -ich/-ig Endings', examples: [ 'der Teppich (rug)', 'der Pfirsich (peach)' ] },
  { condition: 'Most -er Endings', examples: [ 'der Bäcker (baker)', 'der Fahrer (driver)' ] },
  { condition: 'Foreign words ending in -us', examples: ['der Bonus (bonus)', 'der Bus (bus)'] },
  { condition: 'Invitive verbs as nouns without -en', examples: ['der Hilfe (help)', 'der Arbeit (work)'] },
];

const feminineRowData: GenderRowData[] = [
  { condition: 'Feminine People', examples: [ 'die Frau (woman)', 'die Mutter (mother)' ] },
  { condition: 'Numbers', examples: [ 'die Eins (one)', 'die Zwei (two)' ] },
  { condition: 'Most -ung Endings', examples: [ 'die Zeitung (paper)', 'die Leitung (cable)' ] },
  { condition: 'Most -schaft Endings', examples: [ 'die Ortschaft (town)', 'die Herrschaft (rule)' ] },
  { condition: 'Most -ion Endings', examples: [ 'die Nation (nation)', 'die Aktion (action)' ] },
  { condition: 'Most -heit/-keit Endings', examples: [ 'die Einheit (unity)', 'die Reinheit (purity)' ] },
  { condition: 'Most -tät Endings', examples: [ 'die Parität (parity)', 'die Pietät (piety)' ] },
  { condition: 'Most -ik Endings', examples: [ 'die Musik (music)', 'die Logik (logic)' ] },
  { condition: 'Most -ade/-age/-euse/-ere/-ie Endings', examples: [ 'die Fassade (front)', 'die Bühne (stage)' ] },
  { condition: 'Most -anz/-enz Endings', examples: [ 'die Distanz (gap)', 'die Lizenz (permit)' ] },
];

const neuterRowData: GenderRowData[] = [
  { condition: 'Letters', examples: [ 'das A (A)', 'das R (R)' ] },
  { condition: 'Most -chen Endings', examples: [ 'das Kätzchen (kitten)', 'das Säuchen (piglet)' ] },
  { condition: 'Most -um Endings', examples: [ 'das Album (album)', 'das Vacuum (use)' ] },
  { condition: 'Most -ment Endings', examples: [ 'das Zement (cement)', 'das Testament (will)' ] },
  { condition: 'Some Ge- Prefix', examples: [ 'das Gebet (prayer)', 'das Gedicht (poem)' ] },
  { condition: 'Foreign words ending in -ma', examples: [ 'das Karma (karma)', 'das Aroma (aroma)' ] },
  { condition: 'Invitive verbs as nouns', examples: ['das Lesen (reading)', 'das Lernen (learn)'] },
];

const genderSections = [
  { label: 'MASCULINE', data: masculineRowData },
  { label: 'FEMININE', data: feminineRowData },
  { label: 'NEUTER', data: neuterRowData },
];

const italicizeHyphen = (sentence: string): JSX.Element => (
  <span>
    {sentence.split(' ').map((w, i, arr) => (
      <React.Fragment key={i}>
        {w.includes('-') ? <em>{w}</em> : w}
        {i < (arr.length - 1) ? ' ' : ''}
      </React.Fragment>
    ))}
  </span>
);

export const DDDNote = () => (
  <div className='flex flex-col gap-4'>
    <p>German nouns have 3 genders, each with its own article: <b>der</b> (masculine), <b>die</b> (feminine), and <b>das</b> (neuter).</p>
    <p>To remember a noun’s gender and use the correct article, <b>learning general rules</b> can help in most cases.</p>
    <div className='overflow-x-auto mt-2'>
      <table className='min-w-full text-xs'>
        <thead>
          <tr className='base-table-row border-t'>
            <th className='base-table-heading-data w-[45%] text-left'>Condition</th>
            <th className='base-table-heading-data text-left'>Examples</th>
          </tr>
        </thead>
        <tbody>
          {genderSections.map(({ label, data }) => (
            <React.Fragment key={label}>
              <tr className='base-table-row'>
                <td colSpan={2} className='base-table-heading-data text-center'>
                  <b>{label}</b>
                </td>
              </tr>
              {data.map((item, i) => (
                <tr key={i} className='base-table-row'>
                  <td className='w-[45%] pr-1 base-table-data break-words'>
                    {italicizeHyphen(item.condition)}
                  </td>
                  <td className='base-table-data whitespace-pre-line'>
                    {item.examples.join('\n')}
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
    <p className='text-[10px] italic'>
      Acknowledgement:{' '}
      <a
        href='https://grammatisch.com/en/bestimmter_artikel.html'
        target='_blank'
        rel='noopener noreferrer'
        className='hover:text-brdr-goldBrdrTop transition-colors duration-200'
      >
        <u>grammatisch.com</u>
      </a>
    </p>
  </div>
);