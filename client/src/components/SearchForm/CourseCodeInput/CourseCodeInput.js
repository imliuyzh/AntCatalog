import CreatableSelect from 'react-select/creatable';
import { styles2 } from '../../../utils/searchFormStyles';
import { Tooltip } from '@patternfly/react-core';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import * as React from 'react';

const CourseCodeInput = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    let [isTooltipVisible, setIsTooltipVisible] = useState(false);

    return (
        <Tooltip
            content="Please provide 5-digit codes for classes (e.g. 14200, 29000 & 29100)."
            isContentLeftAligned
            isVisible={isTooltipVisible}
            trigger="manual"
        >
            <CreatableSelect
                aria-label="course-code-input"
                isMulti
                onBlur={(_) => setIsTooltipVisible(false)}
                onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseCode: newValue.map(({ value }) => value) }))}
                onFocus={(_) => setIsTooltipVisible(true)}
                placeholder="Course Codes"
                ref={ref}
                styles={styles2}
            />
        </Tooltip>
    );
});

export default CourseCodeInput;
