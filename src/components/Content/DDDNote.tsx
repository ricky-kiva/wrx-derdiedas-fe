import type { JSX } from 'react';
import React from 'react';

interface GenderRowData {
  condition: string,
  examples: string[]
}

const masculineRowData: GenderRowData[] = [
  { condition: 'Male People', examples: [ 'der Mann (man)', 'der Vater (father)' ] },
  { condition: 'Seasons', examples: [ 'der Sommer (summer)', 'der Winter (winter)' ] },
  { condition: 'Precipitations', examples: [ 'der Regen (rain)', 'der Schauer (shower)' ] },
  { condition: 'Date & Time Periods', examples: [ 'der Montag (monday)', 'der Morgen (morning)' ] },
  { condition: '-ling Endings', examples: [ 'der Zwilling (twin)', 'der Lehrling (trainee)' ] },
  { condition: '-ich/-ig Endings', examples: [ 'der Teppich (rug)', 'der Pfirsich (peach)' ] },
  { condition: '-er Endings', examples: [ 'der Bäcker (baker)', 'der Fahrer (driver)' ] },
  { condition: '-us Endings', examples: ['der Rhythmus (rhythm)', 'der Zirkus (circus)'] },
  { condition: '-en Endings', examples: ['der Garten (garden)', 'der Hafen (harbor)'] },
];

const feminineRowData: GenderRowData[] = [
  { condition: 'Feminine People', examples: [ 'die Frau (woman)', 'die Mutter (mother)' ] },
  { condition: 'Numbers', examples: [ 'die Eins (one)', 'die Zwei (two)' ] },
  { condition: '-ung Endings', examples: [ 'die Zeitung (paper)', 'die Leitung (cable)' ] },
  { condition: '-schaft Endings', examples: [ 'die Aussicht (view)', 'die Botschaft (message)' ] },
  { condition: '-ion Endings', examples: [ 'die Nation (nation)', 'die Aktion (action)' ] },
  { condition: '-heit/-keit Endings', examples: [ 'die Einheit (unity)', 'die Mehrheit (major)' ] },
  { condition: '-tät Endings', examples: [ 'die Qualität (quality)', 'die Identität (identity)' ] },
  { condition: '-ik Endings', examples: [ 'die Musik (music)', 'die Logik (logic)' ] },
  { condition: '-ade/-age/-euse/\n-ere/-ie Endings', examples: [ 'die Fassade (front)', 'die Bühne (stage)' ] },
  { condition: '-anz/-enz Endings', examples: [ 'die Distanz (gap)', 'die Lizenz (permit)' ] },
];

const neuterRowData: GenderRowData[] = [
  { condition: 'Letters', examples: [ 'das A (A)', 'das R (R)' ] },
  { condition: 'Infinitives as Nouns', examples: [ 'das Essen (eating)', 'das Laufen (running)' ] },
  { condition: 'Ge- Prefix', examples: [ 'der Gewinn (gain)', 'der Gedanke (thought)' ] },
  { condition: '-chen Endings', examples: [ 'der Kuchen (cake)', 'der Becher (cup)' ] },
  { condition: '-um Endings', examples: [ 'der Album (album)', 'der Konsum (use)' ] },
  { condition: '-ment Endings', examples: [ 'der Moment (moment)', 'der Kommentar (remark)' ] },
  { condition: '-ma Endings', examples: [ 'der Klima (climate)', 'der Schema (scheme)' ] },
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
    <p>To remember a noun’s gender and use the correct article, learning general rules can help in most cases.</p>
    <div className='overflow-x-auto mt-2'>
      <table className='min-w-full text-xs'>
        <thead>
          <tr className='base-table-row border-t'>
            <th className='base-table-heading-data'>Condition</th>
            <th className='base-table-heading-data'>Examples</th>
          </tr>
        </thead>
        <tbody>
          <tr className='base-table-row'>
            <td colSpan={2} className='base-table-heading-data text-center'><b>MASCULINE</b></td>
          </tr>
          {masculineRowData.map((item, i) => (
            <tr key={i} className='base-table-row'>
              <td className='base-table-data'>{italicizeHyphen(item.condition)}</td>
              <td className="base-table-data whitespace-pre-line">
                {item.examples.join('\n')}
              </td>
            </tr>
          ))}
          <tr className='base-table-row'>
            <td colSpan={2} className='base-table-heading-data text-center'><b>FEMININE</b></td>
          </tr>
          {feminineRowData.map((item, i) => (
            <tr key={i} className='base-table-row'>
              <td className={`base-table-data 
                ${item.condition.includes('\n') ? 'whitespace-pre-line' : ''}`}
              >
                {italicizeHyphen(item.condition)}
              </td>
              <td className="base-table-data whitespace-pre-line">
                {item.examples.join('\n')}
              </td>
            </tr>
          ))}
          <tr className='base-table-row'>
            <td colSpan={2} className='base-table-heading-data text-center'><b>NEUTER</b></td>
          </tr>
          {neuterRowData.map((item, i) => (
            <tr key={i} className='base-table-row'>
              <td className='base-table-data'>{italicizeHyphen(item.condition)}</td>
              <td className="base-table-data whitespace-pre-line">
                {item.examples.join('\n')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className='text-[10px] italic'>Acknowledgement: <a 
      href='https://grammatisch.com/en/bestimmter_artikel.html' 
      target='_blank' 
      rel='noopener noreferrer'
      className='hover:text-brdr-goldBrdrTop transition-colors duration-200'
    ><u>grammatisch.com</u>
    </a></p>
  </div>
);
