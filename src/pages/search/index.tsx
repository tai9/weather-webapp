import SearchHistory from '@/components/SearchHistory';
import SearchInput from '@/components/SearchInput';

const SearchPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <SearchInput />
      <SearchHistory />
    </div>
  );
};
export default SearchPage;
