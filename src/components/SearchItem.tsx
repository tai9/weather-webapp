import type { Country } from '@/types/country';

type Props = {
  country: Country;
  allowClear?: boolean;
  onClear?: (country: Country) => void;
};

const SearchItem = ({ country, allowClear = false, onClear }: Props) => {
  return (
    <div className='p-3  bg-white w-full flex gap-4 cursor-pointer justify-between'>
      <div className='flex gap-3'>
        <img width={32} src={country.flags.svg} alt='' />
        <span>
          {country.name.common}, {country.cca2}
        </span>
      </div>
      {allowClear && (
        <div
          className=''
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onClear?.(country);
          }}
        >
          <img src='/icon_delete.png' alt='delete' width={24} />
        </div>
      )}
    </div>
  );
};
export default SearchItem;
