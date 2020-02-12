import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <div className="f3">
                {`${name}, your current entry count: `}
            </div>
            <div className="f2">
                {entries}
            </div>
        </div>
    )
}

export default Rank