import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, UNSAFE_withComponentProps, Outlet, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse, Meta, Links, ScrollRestoration, Scripts } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import { FaEllipsisV, FaSearch, FaEllipsisH, FaMars } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import { Chart, LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend } from "chart.js";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    let timeoutId = setTimeout(
      () => abort(),
      streamTimeout + 1e3
    );
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough({
            final(callback) {
              clearTimeout(timeoutId);
              timeoutId = void 0;
              callback();
            }
          });
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          pipe(body);
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx("title", {
        children: "Tech.Care Dashboard – Patient Health Monitoring"
      }), /* @__PURE__ */ jsx("meta", {
        name: "description",
        content: "Tech.Care Dashboard: Monitor patient vitals, diagnostics, and health history in a modern, responsive interface."
      }), /* @__PURE__ */ jsx("meta", {
        name: "keywords",
        content: "health, dashboard, patient, vitals, diagnostics, medical, monitoring"
      }), /* @__PURE__ */ jsx("meta", {
        name: "author",
        content: "Tech.Care"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:title",
        content: "Tech.Care Dashboard – Patient Health Monitoring"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:description",
        content: "Monitor patient vitals, diagnostics, and health history in a modern, responsive interface."
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:type",
        content: "website"
      }), /* @__PURE__ */ jsx("meta", {
        property: "og:image",
        content: "/images/TestLogo.svg"
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:card",
        content: "summary_large_image"
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:title",
        content: "Tech.Care Dashboard – Patient Health Monitoring"
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:description",
        content: "Monitor patient vitals, diagnostics, and health history in a modern, responsive interface."
      }), /* @__PURE__ */ jsx("meta", {
        name: "twitter:image",
        content: "/images/TestLogo.svg"
      }), /* @__PURE__ */ jsx("link", {
        rel: "icon",
        href: "/favicon.ico"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [/* @__PURE__ */ jsx("main", {
        id: "main-content",
        children
      }), /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const root = UNSAFE_withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function MainNavigation({ isTablet }) {
  return /* @__PURE__ */ jsxs("nav", { className: "main-navigation", children: [
    /* @__PURE__ */ jsx("div", { className: "main-navigation__logo", children: /* @__PURE__ */ jsx("img", { src: "/images/TestLogo.svg", alt: "Tech.Care Logo", className: "logo-img" }) }),
    /* @__PURE__ */ jsxs("ul", { className: "main-navigation__links", children: [
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "nav-link", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/home-icon.svg", alt: "Home", className: "nav-icon" }),
        "Overview"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "nav-link nav-link--active", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/patients-icon.svg", alt: "Patients", className: "nav-icon" }),
        "Patients"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "nav-link", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/calendar-icon.svg", alt: "Schedule", className: "nav-icon" }),
        "Schedule"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "nav-link", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/chat-icon.svg", alt: "Message", className: "nav-icon" }),
        "Message"
      ] }) }),
      /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#", className: "nav-link", children: [
        /* @__PURE__ */ jsx("img", { src: "/images/credit-card-icon.svg", alt: "Credit card", className: "nav-icon" }),
        "Transactions"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "main-navigation__profile", children: [
      /* @__PURE__ */ jsx("img", { src: "/images/doctor.png", alt: "Dr. Jose Simmons", className: "profile-img" }),
      !isTablet && /* @__PURE__ */ jsxs("div", { className: "profile-info", children: [
        /* @__PURE__ */ jsx("span", { className: "profile-name", children: "Dr. Jose Simmons" }),
        /* @__PURE__ */ jsx("span", { className: "profile-role", children: "General Practitioner" })
      ] }),
      /* @__PURE__ */ jsx("img", { src: "/images/settings-cog.svg", alt: "Settings", className: "profile-icon" }),
      /* @__PURE__ */ jsx(FaEllipsisV, { className: "profile-ellipses" })
    ] })
  ] });
}
function Patients({ patients, onPatientSelect }) {
  const [activeIndex, setActiveIndex] = useState(null);
  useEffect(() => {
    if (patients.length > 0 && activeIndex === null) {
      setActiveIndex(3);
      onPatientSelect(patients[3]);
    }
  }, [patients]);
  const handleSelect = (patient, idx) => {
    setActiveIndex(idx);
    onPatientSelect(patient);
  };
  return /* @__PURE__ */ jsxs("div", { className: "patients-container", children: [
    /* @__PURE__ */ jsxs("header", { className: "patients-header", children: [
      /* @__PURE__ */ jsx("h2", { children: "Patients" }),
      /* @__PURE__ */ jsx(FaSearch, { className: "search-icon" })
    ] }),
    /* @__PURE__ */ jsx("ul", { className: "patients-list", children: patients.map((patient, idx) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: `patient-row${activeIndex === idx ? " active" : ""}`,
        onClick: () => handleSelect(patient, idx),
        style: { cursor: "pointer" },
        children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: patient.profile_picture,
              alt: patient.name,
              className: "patient-avatar"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "patient-info", children: [
            /* @__PURE__ */ jsx("span", { className: "patient-name", children: patient.name }),
            /* @__PURE__ */ jsxs("span", { className: "patient-meta", children: [
              patient.gender,
              ", ",
              patient.age
            ] })
          ] }),
          /* @__PURE__ */ jsx(FaEllipsisH, { className: "patient-menu" })
        ]
      },
      patient.name
    )) })
  ] });
}
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);
function BloodPressureChartConfig(history) {
  const labels = history.map((h) => `${h.month.slice(0, 3)}, ${h.year}`);
  const systolicData = history.map((h) => h.blood_pressure.systolic.value);
  const diastolicData = history.map((h) => h.blood_pressure.diastolic.value);
  const data = {
    labels,
    datasets: [
      {
        label: "Systolic",
        data: systolicData,
        borderColor: "#e17be3",
        backgroundColor: "rgba(225, 123, 227, 0.15)",
        pointBackgroundColor: "#e17be3",
        pointBorderColor: "#e17be3",
        tension: 0.5,
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: "y"
      },
      {
        label: "Diastolic",
        data: diastolicData,
        borderColor: "#7b7be3",
        backgroundColor: "rgba(123, 123, 227, 0.15)",
        pointBackgroundColor: "#7b7be3",
        pointBorderColor: "#7b7be3",
        tension: 0.5,
        fill: false,
        pointRadius: 6,
        pointHoverRadius: 8,
        yAxisID: "y"
      }
    ]
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.parsed.y}`
        }
      }
    },
    scales: {
      y: {
        min: 60,
        max: 180,
        ticks: {
          stepSize: 20,
          color: "#7b8794",
          font: { size: 13 }
        },
        grid: {
          color: "#c4c4c4ff"
        }
      },
      x: {
        ticks: {
          color: "#7b8794",
          font: { size: 13 }
        },
        grid: {
          display: false
        }
      }
    }
  };
  return { data, options };
}
function BloodPressureChart({ patient }) {
  if (!patient) {
    return /* @__PURE__ */ jsx("div", { className: "blood-pressure-history-container", children: "No patient data available." });
  }
  const history = [...patient.diagnosis_history].reverse().slice(-6);
  const { data, options } = BloodPressureChartConfig(history);
  const latest = history[history.length - 1];
  return /* @__PURE__ */ jsx("div", { className: "blood-pressue-history-container", children: /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-content", children: [
    /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-chart", children: [
      /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-header", children: [
        /* @__PURE__ */ jsx("div", { className: "blood-pressue-history-title", children: /* @__PURE__ */ jsx("h3", { children: "Blood Pressure" }) }),
        /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-range", children: [
          "Last 6 months",
          " ",
          /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-dropdown", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/expand-icon.svg",
              alt: "Expand Date",
              className: "expand-icon"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Line, { data, options, height: 160 })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-stats", children: [
      /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-stat-row", children: [
        /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-dot systolic" }),
        /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-label", children: "Systolic" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "blood-pressue-history-value", children: latest.blood_pressure.systolic.value }),
      /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-meta higher", children: [
        /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-arrow", children: latest.blood_pressure.systolic.levels === "Higher than Average" ? /* @__PURE__ */ jsx("img", { src: "/images/ArrowDown.svg", alt: "Arrow Down", className: "icon" }) : /* @__PURE__ */ jsx("img", { src: "/images/ArrowUp.svg", alt: "Arrow Up", className: "icon" }) }),
        latest.blood_pressure.systolic.levels
      ] }),
      /* @__PURE__ */ jsx("hr", { className: "blood-pressue-history-divider" }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "blood-pressue-history-stat-row",
          style: { marginTop: 16 },
          children: [
            /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-dot diastolic" }),
            /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-label", children: "Diastolic" })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "blood-pressue-history-value", children: latest.blood_pressure.diastolic.value }),
      /* @__PURE__ */ jsxs("div", { className: "blood-pressue-history-meta lower", children: [
        /* @__PURE__ */ jsx("span", { className: "blood-pressue-history-arrow", children: latest.blood_pressure.diastolic.levels === "Lower than Average" ? /* @__PURE__ */ jsx("img", { src: "/images/ArrowDown.svg", alt: "Arrow Down", className: "icon" }) : /* @__PURE__ */ jsx("img", { src: "/images/ArrowUp.svg", alt: "Arrow Up", className: "icon" }) }),
        latest.blood_pressure.diastolic.levels
      ] })
    ] })
  ] }) });
}
function Vitals({ patient }) {
  var _a;
  if (!patient) {
    return /* @__PURE__ */ jsx("div", { className: "blood-pressure-history-container", children: "No patient data available." });
  }
  const latestEntry = (_a = patient.diagnosis_history) == null ? void 0 : _a[0];
  if (!latestEntry) {
    return /* @__PURE__ */ jsx("div", { className: "blood-pressure-history-container", children: "No vitals data available." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "vitals-container flex justify-between items-center", children: [
    /* @__PURE__ */ jsxs("div", { className: "vital-card respiratory", children: [
      /* @__PURE__ */ jsx("div", { className: "vital-icon", children: /* @__PURE__ */ jsx("img", { src: "/images/respiratory.png", alt: "Respiratory Rate" }) }),
      /* @__PURE__ */ jsx("div", { className: "vital-label", children: "Respiratory Rate" }),
      /* @__PURE__ */ jsxs("div", { className: "vital-value", children: [
        latestEntry.respiratory_rate.value,
        " ",
        /* @__PURE__ */ jsx("span", { className: "vital-unit", children: "bpm" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `vital-status ${latestEntry.respiratory_rate.levels || "normal"}`,
          children: latestEntry.respiratory_rate.levels ? latestEntry.respiratory_rate.levels.toLowerCase().includes("lower") ? /* @__PURE__ */ jsxs("div", { className: "vital-status-info", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/ArrowDown.svg", alt: "Arrow Down", className: "icon" }),
            " Lower than Average"
          ] }) : latestEntry.respiratory_rate.levels.toLowerCase().includes("higher") ? /* @__PURE__ */ jsxs("div", { className: "vital-status-info", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/ArrowUp.svg", alt: "Arrow Up", className: "icon" }),
            " Higher than Average"
          ] }) : latestEntry.respiratory_rate.levels : "Normal"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vital-card temperature", children: [
      /* @__PURE__ */ jsx("div", { className: "vital-icon", children: /* @__PURE__ */ jsx("img", { src: "/images/temperature.png", alt: "Temperature" }) }),
      /* @__PURE__ */ jsx("div", { className: "vital-label", children: "Temperature" }),
      /* @__PURE__ */ jsxs("div", { className: "vital-value", children: [
        latestEntry.temperature.value,
        /* @__PURE__ */ jsx("span", { className: "vital-unit", children: "°F" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `vital-status ${latestEntry.temperature.levels || "normal"}`,
          children: latestEntry.temperature.levels ? latestEntry.temperature.levels.toLowerCase().includes("lower") ? /* @__PURE__ */ jsxs("div", { className: "vital-status-info", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/ArrowDown.svg", alt: "Arrow Down", className: "icon" }),
            " Lower than Average"
          ] }) : latestEntry.temperature.levels.toLowerCase().includes("higher") ? /* @__PURE__ */ jsxs("div", { className: "vital-status-info", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/ArrowUp.svg", alt: "Arrow Up", className: "icon" }),
            " Higher than Average"
          ] }) : latestEntry.temperature.levels : "Normal"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "vital-card heart", children: [
      /* @__PURE__ */ jsx("div", { className: "vital-icon", children: /* @__PURE__ */ jsx("img", { src: "/images/heartBPM.png", alt: "Heart Rate" }) }),
      /* @__PURE__ */ jsx("div", { className: "vital-label", children: "Heart Rate" }),
      /* @__PURE__ */ jsxs("div", { className: "vital-value", children: [
        latestEntry.heart_rate.value,
        " ",
        /* @__PURE__ */ jsx("span", { className: "vital-unit", children: "bpm" })
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `vital-status ${latestEntry.heart_rate.levels || "normal"}`,
          children: latestEntry.heart_rate.levels ? latestEntry.heart_rate.levels.toLowerCase().includes("lower") ? /* @__PURE__ */ jsxs("div", { className: "vital-status-info", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/ArrowDown.svg", alt: "Arrow Down", className: "icon" }),
            " Lower than Average"
          ] }) : latestEntry.heart_rate.levels.toLowerCase().includes("higher") ? /* @__PURE__ */ jsxs("div", { className: "vital-status-info", children: [
            /* @__PURE__ */ jsx("img", { src: "/images/ArrowUp.svg", alt: "Arrow Up", className: "icon" }),
            " Higher than Average"
          ] }) : latestEntry.heart_rate.levels : "Normal"
        }
      )
    ] })
  ] });
}
function DiagnosisHistory({ patient }) {
  if (!patient) {
    return /* @__PURE__ */ jsx("div", { className: "diagnosis-history-container", children: "No patient data available." });
  }
  return /* @__PURE__ */ jsxs("div", { className: "diagnosis-history-container", children: [
    /* @__PURE__ */ jsx("h2", { children: "Diagnosis History" }),
    /* @__PURE__ */ jsx(BloodPressureChart, { patient }),
    /* @__PURE__ */ jsx(Vitals, { patient })
  ] });
}
const mockPatients = [
  {
    name: "Emily Williams",
    gender: "Female",
    age: 18,
    profile_picture: "https://fedskillstest.ct.digital/1.png",
    date_of_birth: "2006-08-19",
    phone_number: "(711) 984-6696",
    emergency_contact: "(680) 653-9512",
    insurance_type: "Premier Auto Corporation",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 163,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 151,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 168,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 158,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 92,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 115,
            levels: "Normal"
          },
          diastolic: {
            value: 80,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 133,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 149,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 165,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Actively being treated"
      },
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Untreated"
      },
      {
        name: "Hypertension",
        description: "A condition in which the force of the blood against the artery walls is too high.",
        status: "Under observation"
      }
    ],
    lab_results: [
      "Complete Blood Count (CBC)",
      "Echocardiogram",
      "Liver Function Tests",
      "Mammography",
      "Urinalysis",
      "Ultrasound",
      "Prostate-Specific Antigen (PSA)",
      "Hemoglobin A1C",
      "Lipid Panel",
      "Radiology Report"
    ]
  },
  {
    name: "Ryan Johnson",
    gender: "Male",
    age: 45,
    profile_picture: "https://fedskillstest.ct.digital/2.png",
    date_of_birth: "1979-11-02",
    phone_number: "(913) 228-2252",
    emergency_contact: "(761) 811-3559",
    insurance_type: "Secure Travel Services",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 137,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 92,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 149,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 76,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 171,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 143,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 97,
            levels: "Normal"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 151,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 117,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 112,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Under observation"
      },
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Cured"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Cured"
      }
    ],
    lab_results: [
      "Complete Blood Count (CBC)",
      "Basic Metabolic Panel (BMP)",
      "Electrocardiogram (EKG)",
      "Comprehensive Metabolic Panel (CMP)",
      "X-Ray",
      "MRI",
      "Renal Function Tests",
      "Radiology Report",
      "Hemoglobin A1C"
    ]
  },
  {
    name: "Brandon Mitchell",
    gender: "Male",
    age: 36,
    profile_picture: "https://fedskillstest.ct.digital/3.png",
    date_of_birth: "1988-11-17",
    phone_number: "(833) 322-4325",
    emergency_contact: "(586) 969-4847",
    insurance_type: "Secure Reinsurance Brokers",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 103,
            levels: "Normal"
          },
          diastolic: {
            value: 107,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 111,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 135,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 155,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 104,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 157,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 133,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 110,
            levels: "Normal"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 64,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 78,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 116,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 155,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 107,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 108,
            levels: "Normal"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 170,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 170,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 127,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 78,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 146,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 96,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 163,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 126,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 180,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 147,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 126,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 116,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Actively being treated"
      },
      {
        name: "Hypertension",
        description: "A condition in which the force of the blood against the artery walls is too high.",
        status: "Cured"
      }
    ],
    lab_results: [
      "Urinalysis",
      "Complete Blood Count (CBC)",
      "Mammography",
      "Hemoglobin A1C",
      "Bone Density Scan"
    ]
  },
  {
    name: "Jessica Taylor",
    gender: "Female",
    age: 28,
    profile_picture: "https://fedskillstest.ct.digital/4.png",
    date_of_birth: "08/23/1996",
    phone_number: "(415) 555-1234",
    emergency_contact: "(415) 555-5678",
    insurance_type: "Sunrise Health Assurance",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 160,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 78,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 98.6,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 128,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 91,
            levels: "Normal"
          },
          diastolic: {
            value: 111,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 173,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 123,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 137,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 112,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 148,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 87,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 102,
            levels: "Normal"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 98,
            levels: "Normal"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 130,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 101,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 173,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 69,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 159,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 139,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 142,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 175,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 111,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 102,
            levels: "Normal"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 166,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 150,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Hypertension",
        description: "Chronic high blood pressure",
        status: "Under Observation"
      },
      {
        name: "Type 2 Diabetes",
        description: "Insulin resistance and elevated blood sugar",
        status: "Cured"
      },
      {
        name: "Asthma",
        description: "Recurrent episodes of bronchial constriction",
        status: "Inactive"
      },
      {
        name: "Osteoarthritis",
        description: "Degenerative joint disease",
        status: "Untreated"
      }
    ],
    lab_results: [
      "Blood Tests",
      "CT Scans",
      "Radiology Reports",
      "X-Rays"
    ]
  },
  {
    name: "Samantha Johnson",
    gender: "Female",
    age: 56,
    profile_picture: "https://fedskillstest.ct.digital/5.png",
    date_of_birth: "1968-11-11",
    phone_number: "(381) 577-7868",
    emergency_contact: "(632) 679-8116",
    insurance_type: "Secure Auto Agency",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 137,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 177,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 96,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 156,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 166,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 140,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 161,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 92,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 164,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 178,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 128,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 83,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 91,
            levels: "Normal"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 85,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 114,
            levels: "Normal"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 142,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 101,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 166,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 100,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 107,
            levels: "Normal"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 110,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 100,
            levels: "Normal"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Hypertension",
        description: "A condition in which the force of the blood against the artery walls is too high.",
        status: "Untreated"
      }
    ],
    lab_results: [
      "Prostate-Specific Antigen (PSA)",
      "Ultrasound",
      "Radiology Report",
      "X-Ray",
      "Lipid Panel",
      "Hemoglobin A1C",
      "Urinalysis"
    ]
  },
  {
    name: "Ashley Martinez",
    gender: "Female",
    age: 54,
    profile_picture: "https://fedskillstest.ct.digital/6.png",
    date_of_birth: "1970-07-16",
    phone_number: "(954) 474-2572",
    emergency_contact: "(848) 505-7394",
    insurance_type: "First Casualty Brokers",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 100,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 124,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 100,
            levels: "Normal"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 115,
            levels: "Normal"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 123,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 130,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 100,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 96,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Untreated"
      },
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Under observation"
      },
      {
        name: "Eczema",
        description: "A condition that causes inflamed, itchy, cracked, and rough skin.",
        status: "Under observation"
      },
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Untreated"
      }
    ],
    lab_results: [
      "Prostate-Specific Antigen (PSA)",
      "MRI",
      "Bone Density Scan",
      "Complete Blood Count (CBC)"
    ]
  },
  {
    name: "Olivia Brown",
    gender: "Female",
    age: 32,
    profile_picture: "https://fedskillstest.ct.digital/7.png",
    date_of_birth: "1992-02-29",
    phone_number: "(660) 228-0411",
    emergency_contact: "(489) 330-7401",
    insurance_type: "American Life Brokers",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 149,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 109,
            levels: "Normal"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 170,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 92,
            levels: "Normal"
          },
          diastolic: {
            value: 89,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 69,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 74,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 139,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 116,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 133,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 118,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 150,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 97,
            levels: "Normal"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 144,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 87,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 147,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 170,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 96,
            levels: "Normal"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 155,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 160,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 174,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 163,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 112,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 164,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Hyperhidrosis",
        description: "A condition characterized by excessive sweating.",
        status: "Under observation"
      },
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Under observation"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Untreated"
      },
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Actively being treated"
      }
    ],
    lab_results: [
      "Echocardiogram",
      "Radiology Report",
      "X-Ray",
      "CT Scan",
      "Mammography",
      "MRI",
      "Hemoglobin A1C",
      "Complete Blood Count (CBC)"
    ]
  },
  {
    name: "Tyler Davis",
    gender: "Male",
    age: 19,
    profile_picture: "https://fedskillstest.ct.digital/8.png",
    date_of_birth: "2005-12-23",
    phone_number: "(390) 417-5963",
    emergency_contact: "(606) 352-0954",
    insurance_type: "Elite Auto Insurance",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 128,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 97,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 106,
            levels: "Normal"
          },
          diastolic: {
            value: 117,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 112,
            levels: "Normal"
          },
          diastolic: {
            value: 78,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 71,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 170,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 156,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 104,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 100,
            levels: "Normal"
          },
          diastolic: {
            value: 85,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 97,
            levels: "Normal"
          },
          diastolic: {
            value: 64,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 96,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 106,
            levels: "Normal"
          },
          diastolic: {
            value: 79,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 74,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 136,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 173,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 107,
            levels: "Normal"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 105,
            levels: "Normal"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 166,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 107,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 159,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 128,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 71,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 99,
            levels: "Normal"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 158,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 134,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 101,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Untreated"
      },
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Actively being treated"
      },
      {
        name: "Hyperhidrosis",
        description: "A condition characterized by excessive sweating.",
        status: "Untreated"
      }
    ],
    lab_results: [
      "Radiology Report",
      "Hemoglobin A1C",
      "Lipid Panel",
      "Urinalysis",
      "Complete Blood Count (CBC)",
      "Thyroid Stimulating Hormone (TSH)",
      "CT Scan",
      "Basic Metabolic Panel (BMP)"
    ]
  },
  {
    name: "Kevin Anderson",
    gender: "Male",
    age: 30,
    profile_picture: "https://fedskillstest.ct.digital/9.png",
    date_of_birth: "1994-06-18",
    phone_number: "(499) 323-3592",
    emergency_contact: "(627) 657-9647",
    insurance_type: "United Auto Services",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 121,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 117,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 72,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 141,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 100,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 91,
            levels: "Normal"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 94,
            levels: "Normal"
          },
          diastolic: {
            value: 102,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 148,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 101,
            levels: "Normal"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 165,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 94,
            levels: "Normal"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 147,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 142,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 101,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 169,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 171,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 111,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 175,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 165,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 180,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 104,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 111,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 100,
            levels: "Normal"
          },
          diastolic: {
            value: 78,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 150,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 150,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 76,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 116,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 121,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 149,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 136,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 124,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Untreated"
      },
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Actively being treated"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Untreated"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Actively being treated"
      },
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Actively being treated"
      }
    ],
    lab_results: [
      "Prostate-Specific Antigen (PSA)",
      "Complete Blood Count (CBC)",
      "MRI",
      "Bone Density Scan",
      "Renal Function Tests",
      "CT Scan",
      "Electrocardiogram (EKG)",
      "Comprehensive Metabolic Panel (CMP)",
      "Hemoglobin A1C",
      "X-Ray"
    ]
  },
  {
    name: "Dylan Thompson",
    gender: "Male",
    age: 36,
    profile_picture: "https://fedskillstest.ct.digital/10.png",
    date_of_birth: "1988-03-15",
    phone_number: "(390) 510-8465",
    emergency_contact: "(517) 955-1190",
    insurance_type: "Secure Auto Corporation",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 76,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 134,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 156,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 90,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 141,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 118,
            levels: "Normal"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 117,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 139,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 97,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 148,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 168,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 112,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 72,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 114,
            levels: "Normal"
          },
          diastolic: {
            value: 118,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 139,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 135,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 132,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 103,
            levels: "Normal"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 169,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 97,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 149,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 118,
            levels: "Normal"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 92,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 137,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 110,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Cured"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Under observation"
      },
      {
        name: "Eczema",
        description: "A condition that causes inflamed, itchy, cracked, and rough skin.",
        status: "Actively being treated"
      },
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Cured"
      }
    ],
    lab_results: [
      "Echocardiogram",
      "Lipid Panel",
      "Radiology Report",
      "X-Ray",
      "Mammography",
      "Basic Metabolic Panel (BMP)",
      "Liver Function Tests",
      "Thyroid Stimulating Hormone (TSH)",
      "Ultrasound"
    ]
  },
  {
    name: "Nathan Evens",
    gender: "Male",
    age: 58,
    profile_picture: "https://fedskillstest.ct.digital/11.png",
    date_of_birth: "1966-09-15",
    phone_number: "(793) 755-6214",
    emergency_contact: "(895) 782-5271",
    insurance_type: "Pacific Casualty Agency",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 98,
            levels: "Normal"
          },
          diastolic: {
            value: 101,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 124,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 151,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 107,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 101,
            levels: "Normal"
          },
          diastolic: {
            value: 104,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 159,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 163,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 109,
            levels: "Normal"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 147,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 97,
            levels: "Normal"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 108,
            levels: "Normal"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 177,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 90,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 92,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 141,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 90,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 100,
            levels: "Normal"
          },
          diastolic: {
            value: 76,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 97,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 157,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 72,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 64,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 96,
            levels: "Normal"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 173,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 91,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Under observation"
      },
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Cured"
      }
    ],
    lab_results: [
      "Urinalysis",
      "Renal Function Tests",
      "Lipid Panel",
      "Basic Metabolic Panel (BMP)",
      "Complete Blood Count (CBC)",
      "Mammography"
    ]
  },
  {
    name: "Mike Nolan",
    gender: "Male",
    age: 31,
    profile_picture: "https://fedskillstest.ct.digital/12.png",
    date_of_birth: "1993-05-18",
    phone_number: "(253) 820-3171",
    emergency_contact: "(826) 361-5767",
    insurance_type: "Secure Cargo Services",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 143,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 83,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 124,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 90,
            levels: "Normal"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 171,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 116,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 89,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 104,
            levels: "Normal"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 103,
            levels: "Normal"
          },
          diastolic: {
            value: 71,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 101,
            levels: "Normal"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 87,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 104,
            levels: "Normal"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 139,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 109,
            levels: "Normal"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 108,
            levels: "Normal"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 104,
            levels: "Normal"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 156,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 90,
            levels: "Normal"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 157,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 101,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 147,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 133,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 162,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 102,
            levels: "Normal"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 97,
            levels: "Normal"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 166,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 162,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 112,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 135,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 126,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 141,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 111,
            levels: "Normal"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 92,
            levels: "Normal"
          },
          diastolic: {
            value: 107,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Untreated"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Under observation"
      }
    ],
    lab_results: [
      "MRI",
      "Mammography",
      "Comprehensive Metabolic Panel (CMP)",
      "Bone Density Scan"
    ]
  },
  {
    name: "John Martinez",
    gender: "Male",
    age: 59,
    profile_picture: "https://fedskillstest.ct.digital/1.png",
    date_of_birth: "1965-07-26",
    phone_number: "(667) 294-1057",
    emergency_contact: "(813) 493-1443",
    insurance_type: "Premier Reinsurance Agency",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 103,
            levels: "Normal"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 123,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 111,
            levels: "Normal"
          },
          diastolic: {
            value: 118,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 144,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 104,
            levels: "Normal"
          },
          diastolic: {
            value: 92,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 117,
            levels: "Normal"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 121,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 87,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 137,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 119,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 87,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 103,
            levels: "Normal"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 165,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 68,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 174,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 168,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 134,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 134,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 145,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 89,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 157,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 102,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 91,
            levels: "Normal"
          },
          diastolic: {
            value: 88,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 101,
            levels: "Normal"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 100,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 121,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 100,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 161,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 168,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 104,
            levels: "Normal"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 135,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Actively being treated"
      }
    ],
    lab_results: [
      "Complete Blood Count (CBC)",
      "CT Scan",
      "Prostate-Specific Antigen (PSA)",
      "Comprehensive Metabolic Panel (CMP)",
      "Hemoglobin A1C",
      "Basic Metabolic Panel (BMP)",
      "Vitamin D Level",
      "Echocardiogram"
    ]
  },
  {
    name: "Richard Brown",
    gender: "Male",
    age: 77,
    profile_picture: "https://fedskillstest.ct.digital/2.png",
    date_of_birth: "1947-01-13",
    phone_number: "(219) 842-6105",
    emergency_contact: "(263) 806-3766",
    insurance_type: "Elite Liability Assurance",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 87,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 173,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 118,
            levels: "Normal"
          },
          diastolic: {
            value: 74,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 168,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 76,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 118,
            levels: "Normal"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 99,
            levels: "Normal"
          },
          diastolic: {
            value: 83,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 109,
            levels: "Normal"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 103,
            levels: "Normal"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 114,
            levels: "Normal"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 140,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 102,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 133,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 122,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 127,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 64,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 121,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 80,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 92,
            levels: "Normal"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 105,
            levels: "Normal"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 171,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 143,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 76,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 165,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Actively being treated"
      },
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Untreated"
      }
    ],
    lab_results: [
      "Basic Metabolic Panel (BMP)",
      "Comprehensive Metabolic Panel (CMP)",
      "Electrocardiogram (EKG)"
    ]
  },
  {
    name: "Jennifer Johnson",
    gender: "Female",
    age: 89,
    profile_picture: "https://fedskillstest.ct.digital/3.png",
    date_of_birth: "1935-07-13",
    phone_number: "(801) 717-8033",
    emergency_contact: "(404) 393-5571",
    insurance_type: "Elite Health Assurance",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 71,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 131,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 92,
            levels: "Normal"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 96,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 168,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 102,
            levels: "Normal"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 72,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 134,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 147,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 102,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 162,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 102,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 130,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 69,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 67,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 97,
            levels: "Normal"
          },
          diastolic: {
            value: 117,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 133,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 119,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 124,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 174,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 69,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 150,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 97,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 105,
            levels: "Normal"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 72,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 142,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 127,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 80,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Cured"
      },
      {
        name: "Hyperhidrosis",
        description: "A condition characterized by excessive sweating.",
        status: "Actively being treated"
      },
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Untreated"
      },
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Under observation"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Actively being treated"
      }
    ],
    lab_results: [
      "Hemoglobin A1C",
      "X-Ray",
      "Echocardiogram",
      "Basic Metabolic Panel (BMP)",
      "Ultrasound",
      "Bone Density Scan",
      "CT Scan",
      "Comprehensive Metabolic Panel (CMP)"
    ]
  },
  {
    name: "Thomas Johnson",
    gender: "Male",
    age: 47,
    profile_picture: "https://fedskillstest.ct.digital/4.png",
    date_of_birth: "1977-12-12",
    phone_number: "(567) 253-4481",
    emergency_contact: "(724) 623-7174",
    insurance_type: "Elite Cargo Brokers",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 90,
            levels: "Normal"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 129,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 63,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 110,
            levels: "Normal"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 114,
            levels: "Normal"
          },
          diastolic: {
            value: 110,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 75,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 108,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 102,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 114,
            levels: "Normal"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 171,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 143,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 84,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 108,
            levels: "Normal"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 77,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 136,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 73,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 175,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 105,
            levels: "Normal"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 107,
            levels: "Normal"
          },
          diastolic: {
            value: 116,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 146,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 95,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 171,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 113,
            levels: "Normal"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 155,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 62,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 155,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 12,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 125,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 110,
            levels: "Normal"
          },
          diastolic: {
            value: 65,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 103,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 119,
            levels: "Normal"
          },
          diastolic: {
            value: 83,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 110,
            levels: "Normal"
          },
          diastolic: {
            value: 85,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 144,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 72,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 160,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 66,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 86,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2021,
        blood_pressure: {
          systolic: {
            value: 155,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 99,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Under observation"
      },
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Untreated"
      },
      {
        name: "Type 1 Diabetes",
        description: "A chronic condition in which the pancreas produces little or no insulin.",
        status: "Untreated"
      },
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Actively being treated"
      }
    ],
    lab_results: [
      "Ultrasound",
      "Electrocardiogram (EKG)",
      "Hemoglobin A1C",
      "CT Scan",
      "Thyroid Stimulating Hormone (TSH)",
      "X-Ray"
    ]
  },
  {
    name: "William Johnson",
    gender: "Male",
    age: 51,
    profile_picture: "https://fedskillstest.ct.digital/5.png",
    date_of_birth: "1973-04-15",
    phone_number: "(536) 287-3257",
    emergency_contact: "(946) 299-4175",
    insurance_type: "Global Auto Corporation",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 63,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 120,
            levels: "Normal"
          },
          diastolic: {
            value: 74,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 146,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 98,
            levels: "Normal"
          },
          diastolic: {
            value: 62,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 91,
            levels: "Normal"
          },
          diastolic: {
            value: 120,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 112,
            levels: "Normal"
          },
          diastolic: {
            value: 85,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 154,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 177,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 112,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 78,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 153,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 118,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Cured"
      },
      {
        name: "Eczema",
        description: "A condition that causes inflamed, itchy, cracked, and rough skin.",
        status: "Cured"
      }
    ],
    lab_results: [
      "Thyroid Stimulating Hormone (TSH)",
      "Basic Metabolic Panel (BMP)",
      "Complete Blood Count (CBC)",
      "Comprehensive Metabolic Panel (CMP)",
      "Ultrasound",
      "Prostate-Specific Antigen (PSA)",
      "Liver Function Tests",
      "Echocardiogram",
      "Lipid Panel"
    ]
  },
  {
    name: "David Miller",
    gender: "Male",
    age: 34,
    profile_picture: "https://fedskillstest.ct.digital/6.png",
    date_of_birth: "1990-04-02",
    phone_number: "(952) 767-2936",
    emergency_contact: "(216) 364-3474",
    insurance_type: "First Casualty Insurance",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 134,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 100,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 90,
            levels: "Normal"
          },
          diastolic: {
            value: 64,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 92,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 180,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 79,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 18,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 141,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 90,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 130,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 87,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 92,
            levels: "Normal"
          },
          diastolic: {
            value: 78,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 71,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 93,
            levels: "Normal"
          },
          diastolic: {
            value: 70,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 68,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 30,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 143,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 176,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 93,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Under observation"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Cured"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Untreated"
      }
    ],
    lab_results: [
      "CT Scan",
      "Mammography",
      "Liver Function Tests",
      "Radiology Report",
      "Complete Blood Count (CBC)"
    ]
  },
  {
    name: "David Johnson",
    gender: "Male",
    age: 61,
    profile_picture: "https://fedskillstest.ct.digital/7.png",
    date_of_birth: "1963-01-26",
    phone_number: "(513) 221-6670",
    emergency_contact: "(833) 998-1719",
    insurance_type: "Premier Property Services",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 64,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 173,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 82,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 179,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 99,
            levels: "Normal"
          },
          diastolic: {
            value: 94,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 64,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 27,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 164,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 81,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 92,
            levels: "Normal"
          },
          diastolic: {
            value: 86,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 28,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 73,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 163,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 79,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 139,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 158,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 81,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 83,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 101,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 114,
            levels: "Normal"
          },
          diastolic: {
            value: 71,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 84,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 90,
            levels: "Normal"
          },
          diastolic: {
            value: 72,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 89,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "March",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 108,
            levels: "Normal"
          },
          diastolic: {
            value: 75,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "February",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 107,
            levels: "Normal"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 94,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 106,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 96,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 118,
            levels: "Normal"
          },
          diastolic: {
            value: 104,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 88,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 29,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 140,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 89,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 76,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 21,
          levels: "Normal"
        },
        temperature: {
          value: 97,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 138,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 105,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 95,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 22,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 152,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 98,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 162,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 61,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "July",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 167,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 91,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 66,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 14,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 108,
            levels: "Normal"
          },
          diastolic: {
            value: 115,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 97,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "May",
        year: 2022,
        blood_pressure: {
          systolic: {
            value: 91,
            levels: "Normal"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 69,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 26,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Type 2 Diabetes",
        description: "A chronic condition that affects the way the body processes blood sugar (glucose).",
        status: "Under observation"
      },
      {
        name: "Osteoarthritis",
        description: "A type of arthritis that occurs when flexible tissue at the ends of bones wears down.",
        status: "Under observation"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Actively being treated"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Actively being treated"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Under observation"
      }
    ],
    lab_results: [
      "Renal Function Tests",
      "CT Scan",
      "X-Ray",
      "Echocardiogram",
      "Vitamin D Level",
      "Electrocardiogram (EKG)",
      "Liver Function Tests"
    ]
  },
  {
    name: "Elizabeth Johnson",
    gender: "Female",
    age: 31,
    profile_picture: "https://fedskillstest.ct.digital/8.png",
    date_of_birth: "1993-01-10",
    phone_number: "(325) 542-8009",
    emergency_contact: "(690) 207-5485",
    insurance_type: "Global Property Assurance",
    diagnosis_history: [
      {
        month: "March",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 115,
            levels: "Normal"
          },
          diastolic: {
            value: 77,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 60,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "February",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 175,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 109,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 20,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "January",
        year: 2024,
        blood_pressure: {
          systolic: {
            value: 110,
            levels: "Normal"
          },
          diastolic: {
            value: 67,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 96,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "December",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 95,
            levels: "Normal"
          },
          diastolic: {
            value: 118,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 85,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 16,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "November",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 174,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 60,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 98,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 24,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "October",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 150,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 118,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 70,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 19,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "September",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 116,
            levels: "Normal"
          },
          diastolic: {
            value: 93,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 80,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 98,
          levels: "Normal"
        }
      },
      {
        month: "August",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 165,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 113,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 74,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 15,
          levels: "Normal"
        },
        temperature: {
          value: 100,
          levels: "Normal"
        }
      },
      {
        month: "July",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 146,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 114,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 82,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 25,
          levels: "Normal"
        },
        temperature: {
          value: 102,
          levels: "Higher than Average"
        }
      },
      {
        month: "June",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 142,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 79,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 99,
          levels: "Normal"
        },
        respiratory_rate: {
          value: 17,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      },
      {
        month: "May",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 137,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 80,
            levels: "Lower than Average"
          }
        },
        heart_rate: {
          value: 65,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 23,
          levels: "Normal"
        },
        temperature: {
          value: 99,
          levels: "Normal"
        }
      },
      {
        month: "April",
        year: 2023,
        blood_pressure: {
          systolic: {
            value: 149,
            levels: "Higher than Average"
          },
          diastolic: {
            value: 90,
            levels: "Normal"
          }
        },
        heart_rate: {
          value: 61,
          levels: "Lower than Average"
        },
        respiratory_rate: {
          value: 13,
          levels: "Normal"
        },
        temperature: {
          value: 103,
          levels: "Higher than Average"
        }
      }
    ],
    diagnostic_list: [
      {
        name: "Allergies",
        description: "The immune system's reaction to foreign substances that are typically not harmful.",
        status: "Cured"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Cured"
      },
      {
        name: "Heart Murmur",
        description: "Sounds during your heartbeat cycle made by turbulent blood in or near your heart.",
        status: "Actively being treated"
      },
      {
        name: "Asthma",
        description: "A condition in which your airways narrow and swell and may produce extra mucus.",
        status: "Under observation"
      },
      {
        name: "Hyperhidrosis",
        description: "A condition characterized by excessive sweating.",
        status: "Under observation"
      }
    ],
    lab_results: [
      "Ultrasound",
      "Urinalysis",
      "Lipid Panel",
      "Radiology Report",
      "Bone Density Scan",
      "Prostate-Specific Antigen (PSA)"
    ]
  }
];
async function fetchPatients() {
  {
    return mockPatients;
  }
}
function DiagnosticList({ patient }) {
  const diagnostics = (patient == null ? void 0 : patient.diagnostic_list) || [];
  return /* @__PURE__ */ jsx("div", { className: "diagnostic-list-container flex justify-center items-center", children: /* @__PURE__ */ jsxs("div", { className: "diagnostic-list-content", children: [
    /* @__PURE__ */ jsx("h2", { className: "diagnostic-list-title", children: "Diagnostic List" }),
    /* @__PURE__ */ jsx("div", { className: "diagnostic-list-table-wrapper", children: /* @__PURE__ */ jsxs("table", { className: "diagnostic-list-table", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { children: "Problem/Diagnosis" }),
        /* @__PURE__ */ jsx("th", { children: "Description" }),
        /* @__PURE__ */ jsx("th", { children: "Status" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: diagnostics.length > 0 ? diagnostics.map((item, idx) => /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("td", { children: item.name }),
        /* @__PURE__ */ jsx("td", { children: item.description }),
        /* @__PURE__ */ jsx("td", { children: item.status })
      ] }, idx)) : /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
        "td",
        {
          colSpan: 3,
          style: { textAlign: "center", color: "#888" },
          children: "No diagnostic data available."
        }
      ) }) })
    ] }) })
  ] }) });
}
function PatientInfo({ patient }) {
  if (!patient) return null;
  return /* @__PURE__ */ jsxs("div", { className: "patient-info-container flex flex-col items-center mx-auto bg-white rounded-2xl p-6", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: patient.profile_picture,
        alt: patient.name,
        className: "rounded-full object-cover mb-4 border-4 border-white"
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl mb-6 font-bold", children: patient.name }),
    /* @__PURE__ */ jsxs("div", { className: "w-full flex flex-col gap-5 mb-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-wrap rounded-full", children: /* @__PURE__ */ jsx("img", { src: "/images/BirthIcon.svg", alt: "Date of Birth Icon", className: "icon" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { children: "Date Of Birth" }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: new Date(patient.date_of_birth).toLocaleDateString(void 0, {
            year: "numeric",
            month: "long",
            day: "numeric"
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-wrap rounded-full", children: patient.gender.toLowerCase() === "male" ? /* @__PURE__ */ jsx(FaMars, { className: "icon male" }) : patient.gender.toLowerCase() === "female" ? /* @__PURE__ */ jsx("img", { src: "/images/FemaleIcon.svg", alt: "Female Icon", className: "icon" }) : null }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { children: "Gender" }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: patient.gender })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-wrap rounded-full", children: /* @__PURE__ */ jsx("img", { src: "/images/PhoneIcon.svg", alt: "Contact Info.", className: "icon" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { children: "Contact Info." }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: patient.phone_number })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-wrap rounded-full", children: /* @__PURE__ */ jsx("img", { src: "/images/PhoneIcon.svg", alt: "Emergency Contact Info.", className: "icon" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { children: "Emergency Contacts" }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: patient.emergency_contact })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx("span", { className: "icon-wrap rounded-full", children: /* @__PURE__ */ jsx("img", { src: "/images/InsuranceIcon.svg", alt: "Insurance Provider Info.", className: "icon" }) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { children: "Insurance Provider" }),
          /* @__PURE__ */ jsx("div", { className: "font-semibold", children: patient.insurance_type })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "w-full mt-2 py-3 rounded-full font-semibold transition", children: "Show All Information" })
  ] });
}
function LabResults({ patient }) {
  var _a;
  if (!patient || !((_a = patient.lab_results) == null ? void 0 : _a.length)) return null;
  return /* @__PURE__ */ jsxs("div", { className: "lab-results-container", children: [
    /* @__PURE__ */ jsx("h2", { children: "Lab Results" }),
    /* @__PURE__ */ jsx("div", { className: "lab-results overflow-y-auto max-h-60", children: patient.lab_results.map((result, idx) => /* @__PURE__ */ jsxs("div", { className: "lab-result-row", children: [
      /* @__PURE__ */ jsx("span", { className: "text-base", children: result }),
      /* @__PURE__ */ jsx("button", { "aria-label": `Download ${result}`, children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/images/download-icon.svg",
          alt: `Download ${result}`,
          className: "icon"
        }
      ) })
    ] }, result)) })
  ] });
}
function HomeDashboard() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPatient, setSelectedPatient] = useState(null);
  useEffect(() => {
    fetchPatients().then((data) => setPatients(data)).finally(() => setLoading(false));
  }, []);
  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };
  function useIsTablet() {
    const getIsTablet = () => typeof window !== "undefined" && window.innerWidth <= 1024;
    const [isTablet2, setIsTablet] = useState(getIsTablet());
    useEffect(() => {
      if (typeof window === "undefined") return;
      const handleResize = () => setIsTablet(getIsTablet());
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return isTablet2;
  }
  const isTablet = useIsTablet();
  if (loading) return /* @__PURE__ */ jsx("div", { children: "Loading..." });
  if (isTablet) {
    return /* @__PURE__ */ jsxs("main", { className: "home-dashboard flex flex-col items-center justify-center pb-4", children: [
      /* @__PURE__ */ jsx(MainNavigation, { isTablet }),
      /* @__PURE__ */ jsxs("div", { className: "home-dashboard__content flex flex-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "home-dashboard__content__column patients-info", children: [
          /* @__PURE__ */ jsx(PatientInfo, { patient: selectedPatient }),
          /* @__PURE__ */ jsx(
            Patients,
            {
              patients,
              onPatientSelect: handlePatientSelect
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "home-dashboard__content__column diagnostics-info", children: [
          /* @__PURE__ */ jsx(DiagnosisHistory, { patient: selectedPatient }),
          /* @__PURE__ */ jsx(DiagnosticList, { patient: selectedPatient }),
          /* @__PURE__ */ jsx(LabResults, { patient: selectedPatient })
        ] })
      ] })
    ] });
  } else {
    return /* @__PURE__ */ jsxs("main", { className: "home-dashboard flex flex-col items-center justify-center pb-4", children: [
      /* @__PURE__ */ jsx(MainNavigation, { isTablet }),
      /* @__PURE__ */ jsxs("div", { className: "home-dashboard__content flex flex-row justify-space-between", children: [
        /* @__PURE__ */ jsx("div", { className: "home-dashboard__content__column patients", children: /* @__PURE__ */ jsx(
          Patients,
          {
            patients,
            onPatientSelect: handlePatientSelect
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "home-dashboard__content__column diagnostics", children: [
          /* @__PURE__ */ jsx(DiagnosisHistory, { patient: selectedPatient }),
          /* @__PURE__ */ jsx(DiagnosticList, { patient: selectedPatient })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "home-dashboard__content__column profile-labs", children: [
          /* @__PURE__ */ jsx(PatientInfo, { patient: selectedPatient }),
          /* @__PURE__ */ jsx(LabResults, { patient: selectedPatient })
        ] })
      ] })
    ] });
  }
}
function meta({}) {
  return [{
    title: "Tech.Care Dashboard"
  }, {
    name: "description",
    content: "Welcome to Tech.Care Dashboard!"
  }];
}
const home = UNSAFE_withComponentProps(function Home() {
  return /* @__PURE__ */ jsx("main", {
    className: "home flex justify-center pb-4",
    children: /* @__PURE__ */ jsx(HomeDashboard, {})
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/react-dashboardassets/entry.client-BWBOP0Ds.js", "imports": ["/react-dashboardassets/chunk-PVWAREVJ-BGDX7Rsd.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/react-dashboardassets/root-BlXkKcRA.js", "imports": ["/react-dashboardassets/chunk-PVWAREVJ-BGDX7Rsd.js"], "css": ["/react-dashboardassets/root-DbVztZXN.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/react-dashboardassets/home-Cw7atX4D.js", "imports": ["/react-dashboardassets/chunk-PVWAREVJ-BGDX7Rsd.js"], "css": ["/react-dashboardassets/home-DGpVSmHf.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/react-dashboardassets/manifest-57d92929.js", "version": "57d92929", "sri": void 0 };
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/react-dashboard";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
