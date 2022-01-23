'use-strict';

const target = document.querySelector('.box');

function slideToggle(element, durationInMS = 1000) {
    const isElementHidden = !element.offsetParent;
    const test = getComputedStyle(element, null);

    const paddingTop = parseInt(test.getPropertyValue('padding-top'));
    const paddingBottom = parseInt(test.getPropertyValue('padding-bottom'));
    const borderTop = parseInt(test.getPropertyValue('border-top-width'));
    const borderBottom = parseInt(test.getPropertyValue('border-bottom-width'));

    const padding = paddingTop + paddingBottom;
    const border = borderBottom + borderTop;

    const duration = Math.max(100, durationInMS);

    element.style.overflow = 'hidden';

    if (isElementHidden) {
        element.style.display = 'block';
        element.style.height = '0px';
    }

    const totalStepsNumber = duration / 50;
    const scrollHeight = element.scrollHeight + border;
    const step = Math.round(scrollHeight / totalStepsNumber);

    const callback = function (timestamp) {
        const { height } = element.getBoundingClientRect();

        if (isElementHidden) {
            if (height < scrollHeight) {
                element.style.height = `${Math.min(scrollHeight, (height + step))}px`;
                window.requestAnimationFrame(callback);
            }

            return;
        }

        if (height - padding - border > 0) {
            element.style.height = `${Math.max(0, (height - step))}px`;
            window.requestAnimationFrame(callback);
        } else {
            element.style.display = 'none';
        }
    };

    window.requestAnimationFrame(callback);
}

document.querySelector('button.toggle').addEventListener('click', slideToggle.bind(null, target, 1000), { passive: true });
