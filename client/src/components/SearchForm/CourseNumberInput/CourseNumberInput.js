import CreatableSelect from 'react-select/creatable';
import { styles2 } from '../../../utils/searchFormStyles';
import { Tooltip } from '@patternfly/react-core';
import { updateFormInput } from '../../../features/internalStateSlice';
import { useDispatch } from 'react-redux';
import * as React from 'react';

const CourseNumberInput = React.forwardRef((_, ref) => {
    let internalStateDispatch = useDispatch();
    let [isTooltipVisible, setIsTooltipVisible] = React.useState(false);

    return (
        <Tooltip
            content="Please provide alphanumeric codes for courses (e.g. H2A, 8C & 102)."
            isContentLeftAligned
            isVisible={isTooltipVisible}
            trigger="manual"
        >
            <CreatableSelect
                aria-label="course-number-input"
                isMulti
                onBlur={(_) => setIsTooltipVisible(false)}
                onChange={(newValue, _) => internalStateDispatch(updateFormInput({ courseNumber: newValue.map(({ value }) => value) }))}
                onFocus={(_) => setIsTooltipVisible(true)}
                placeholder="Course Numbers"
                ref={ref}
                styles={styles2}
            />
        </Tooltip>
    );
});

export default CourseNumberInput;
