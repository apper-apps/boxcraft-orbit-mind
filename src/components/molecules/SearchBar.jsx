import React from 'react'
import Input from '@/components/atoms/Input'

const SearchBar = ({ 
  value, 
  onChange, 
  placeholder = 'Search templates...',
  className = '' 
}) => {
  return (
    <div className={`max-w-md ${className}`}>
      <Input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        icon="Search"
        className="w-full"
      />
    </div>
  )
}

export default SearchBar