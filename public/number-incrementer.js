(function () {
  class NumberIncrementer {
    static DATA_ATTRIBUTE_BASE = "data-mr-number-incrementer";
    static DATA_ATTRIBUTE_INCREMENT_START = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-start`;
    static DATA_ATTRIBUTE_INCREMENT_END = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-end`;
    static DATA_ATTRIBUTE_INCREMENT_DURATION = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-duration`;
    static DATA_ATTRIBUTE_PERCENTAGE_VISIBLE = `${NumberIncrementer.DATA_ATTRIBUTE_BASE}-percentage-visible`;

    static DEFAULT_INCREMENT_START = 0;
    static DEFAULT_INCREMENT_END = 100;
    static DEFAULT_INCREMENT_DURATION = 1000; // duration in ms
    static DEFAULT_UPDATE_INTERVAL = 100; // duration in ms
    static DEFAULT_PERCENTAGE_VISIBLE = 25;

    constructor(element) {
      this.element = element;

      this.setup();
    }

    setup() {
      this.percentageVisibleToInvoke = this.getIntValue(
        NumberIncrementer.DATA_ATTRIBUTE_PERCENTAGE_VISIBLE,
        NumberIncrementer.DEFAULT_PERCENTAGE_VISIBLE,
      );

      const options = {
        rootMargin: "0px",
        threshold: this.percentageVisibleToInvoke / 100,
      };

      this.incrementStart = this.getIntValue(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_START,
        NumberIncrementer.DEFAULT_INCREMENT_START,
      );

      this.incrementEnd = this.getIntValue(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_END,
        NumberIncrementer.DEFAULT_INCREMENT_END,
      );

      this.duration = this.getIntValue(
        NumberIncrementer.DATA_ATTRIBUTE_INCREMENT_DURATION,
        NumberIncrementer.DEFAULT_INCREMENT_DURATION,
      );

      this.observer = new IntersectionObserver(
        function (entries) {
          for (let entry of entries) {
            if (entry.isIntersecting) {
              this.observer.unobserve(this.element); // Stop observing once triggered
              this.run();
            }
          }
        }.bind(this),
        options,
      );

      this.observer.observe(this.element);
    }

    getIntValue(attribute, defaultValue) {
      return parseInt(this.element.getAttribute(attribute)) || defaultValue;
    }

    run() {
      const increment =
        (this.incrementEnd - this.incrementStart) /
        (this.duration / NumberIncrementer.DEFAULT_UPDATE_INTERVAL); // calculate the update per interval

      let currentNumber = this.incrementStart;

      const interval = setInterval(
        function () {
          currentNumber += increment;

          this.element.textContent = Math.min(
            Math.round(currentNumber),
            this.incrementEnd,
          );

          if (currentNumber >= this.incrementEnd) {
            clearInterval(interval);
          }
        }.bind(this),
        NumberIncrementer.DEFAULT_UPDATE_INTERVAL,
      );
    }

    disconnect() {
      this.observer.disconnect();
    }

    static findAllElements() {
      return [
        ...document.querySelectorAll(
          `*[${NumberIncrementer.DATA_ATTRIBUTE_BASE}='true']`,
        ),
      ];
    }

    static setupAllInstances() {
      return NumberIncrementer.findAllElements().map(function (instance) {
        return new NumberIncrementer(instance);
      });
    }
  }

  let webflow_preview_observer;
  let number_incrementers;

  // check if node is an instance of a specific type
  function _instanceOf(target, type) {
    return Object.prototype.toString.call(target) === `[object ${type}]`;
  }

  // observer webflow for user switching from previewer to designer
  function observeForWebflowPreviewer() {
    const element = document.querySelector("html");

    webflow_preview_observer = new MutationObserver(function (
      mutationsList,
      observer,
    ) {
      for (const mutation of mutationsList) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          _instanceOf(mutation.target, "HTMLHtmlElement")
        ) {
          const htmlElement = mutation.target;

          if (htmlElement.classList.contains("wf-design-mode")) {
            console.log("disconnecting webflow preview observer");
            observer.disconnect();
            number_incrementers.forEach(function (incrementer) {
              console.log("disconnecting number increment observer");
              incrementer.disconnect();
            });
          }
        }
      }
    });

    // Start observing changes to the 'class' attribute of the <html> element
    webflow_preview_observer.observe(element, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  function setupNumberIncrementer() {
    // Intersection Observer setup
    number_incrementers = NumberIncrementer.setupAllInstances();
  }

  function loadScript() {
    setupNumberIncrementer();

    observeForWebflowPreviewer();
  }

  // check whether page has already loaded for dynamic insert in webflow preview
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      loadScript();
    });
  } else {
    loadScript();
  }
})();
