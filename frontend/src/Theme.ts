import { deepMerge } from 'grommet/utils';

const Theme = deepMerge({
  global: {
    colors: {
      primary: '#00C781',
      secondary: '#303f42',
      contrast: '#18292c',
      'secondary-light': '#7e93a6',
      'contrast-light': '#223b40',
      text: '#DADADA',
      'accent-1': 'primary',
      focus: 'primary',
      selected: 'primary'
    },
    font: {
      family: 'Dosis',
      size: '16px',
      height: '20px',
    },
    breakpoints: {
      xsmall: {
        value: 500,
      },
      small: {
        value: 900,
      },
      medium: {
        value: 1200
      },
      large: {
        value: 1500,
      }
    },
    input: {
      weight: 400
    },
    hover: {
      background: {
        color: 'secondary',
        opacity: 1
      },
    },
    drop: {
      elevation: 'none'
    }
  },
  text: {
    medium: {
      size: '1rem'
    }
  },
  tab: {
    active: { color: 'primary' },
    border: {
      size: '0px',
      color: {
        dark: 'secondary-light'
      },
      active: {
        color: {
          dark: 'primary'
        },
      },
      hover: {
        color: {
          dark: 'status-disabled'
        },
      }
    },
    color: {
      dark: 'secondary-light'
    },
    hover: {
      color: 'status-disabled'
    }
  },
  table: {
    header: {
      border: {
        color: {
          dark: 'primary'
        },
        side: 'bottom'
      },
      extend: {
        color: '#00C781'
      }
    },
    body: {
      extend: {
        color: '#DADADA'
      }
    },
  },
  button: {
    border: {
      radius: 0
    },
    color: {
      dark: 'contrast'
    },
    default: {
      color: 'primary',
      border: undefined,
      font: { weight: 500 },
      padding: {
        horizontal: '8px',
        vertical: '8px',
      }
    },
    primary: {
      background: {
        color: 'primary'
      },
      color: 'contrast',
      font: { weight: 500 },
      padding: {
        horizontal: '16px',
        vertical: '6px',
      }
    },
    secondary: {
      background: {
        color: 'contrast-light'
      },
      color: 'secondary-light',
      font: { weight: 500 },
      padding: {
        horizontal: '16px',
        vertical: '6px',
      }
    },
    disabled: {
      background: {
        color: 'primary',
      },
      color: 'contrast'
    }
  },
  formField: {
    label: {
      weight: 600,
      margin: '6px 11px 0px 11px'
    },
  },
  select: {
    container: {
      extend: {
        background: '#223b40',
      },
    },
    icons: {
      margin: '0px 0px',
    },
    options: {
      text: {
        size: '1rem'
      },
    }
  }
});

export default Theme;