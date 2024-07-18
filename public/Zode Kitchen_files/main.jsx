import { createHotContext as __vite__createHotContext } from "/@vite/client";import.meta.hot = __vite__createHotContext("/src/main.jsx");import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=9e8eec61"; const jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import RefreshRuntime from "/@react-refresh";
const inWebWorker = typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;
if (import.meta.hot && !inWebWorker) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error("@vitejs/plugin-react can't detect preamble. Something is wrong. See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201");
  }
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx " + id);
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}
import __vite__cjsImport3_react from "/node_modules/.vite/deps/react.js?v=9e8eec61"; const React = __vite__cjsImport3_react.__esModule ? __vite__cjsImport3_react.default : __vite__cjsImport3_react;
import __vite__cjsImport4_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=9e8eec61"; const ReactDOM = __vite__cjsImport4_reactDom_client.__esModule ? __vite__cjsImport4_reactDom_client.default : __vite__cjsImport4_reactDom_client;
import { createBrowserRouter, RouterProvider, Outlet } from "/node_modules/.vite/deps/react-router-dom.js?v=9e8eec61";
import App from "/src/App.jsx?t=1721220285007";
import { Welcome } from "/src/components/welcome.jsx";
import { Beverages } from "/src/components/Beverages.jsx?t=1721219848190";
import { Snack } from "/src/components/Snack.jsx";
import { Cart } from "/src/components/Cart.jsx";
import { CartProvider } from "/src/context/CartContext.js.jsx";
import "/src/index.css";
const MainLayout = () => /* @__PURE__ */ jsxDEV(App, { children: /* @__PURE__ */ jsxDEV(Outlet, {}, void 0, false, {
  fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
  lineNumber: 16,
  columnNumber: 9
}, this) }, void 0, false, {
  fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
  lineNumber: 15,
  columnNumber: 1
}, this);
_c = MainLayout;
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: /* @__PURE__ */ jsxDEV(MainLayout, {}, void 0, false, {
        fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
        lineNumber: 23,
        columnNumber: 12
      }, this),
      children: [
        { path: "/", element: /* @__PURE__ */ jsxDEV(Welcome, {}, void 0, false, {
          fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
          lineNumber: 25,
          columnNumber: 25
        }, this) },
        { path: "beverages", element: /* @__PURE__ */ jsxDEV(Beverages, {}, void 0, false, {
          fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
          lineNumber: 26,
          columnNumber: 33
        }, this) },
        { path: "snacks", element: /* @__PURE__ */ jsxDEV(Snack, {}, void 0, false, {
          fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
          lineNumber: 27,
          columnNumber: 30
        }, this) },
        { path: "cart", element: /* @__PURE__ */ jsxDEV(Cart, {}, void 0, false, {
          fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
          lineNumber: 28,
          columnNumber: 28
        }, this) }
      ]
    }
  ]
);
ReactDOM.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxDEV(React.StrictMode, { children: /* @__PURE__ */ jsxDEV(CartProvider, { children: /* @__PURE__ */ jsxDEV(RouterProvider, { router }, void 0, false, {
    fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
    lineNumber: 36,
    columnNumber: 13
  }, this) }, void 0, false, {
    fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
    lineNumber: 35,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx",
    lineNumber: 34,
    columnNumber: 3
  }, this)
);
var _c;
$RefreshReg$(_c, "MainLayout");
if (import.meta.hot && !inWebWorker) {
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
}
if (import.meta.hot && !inWebWorker) {
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh("C:/Users/Bilal Dadi/Desktop/Zode/Zode_kitchin/src/main.jsx", currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      const invalidateMessage = RefreshRuntime.validateRefreshBoundaryAndEnqueueUpdate(currentExports, nextExports);
      if (invalidateMessage) import.meta.hot.invalidate(invalidateMessage);
    });
  });
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJtYXBwaW5ncyI6IkFBZVE7QUFmUixPQUFPQSxvQkFBa0I7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDekIsT0FBT0MsY0FBYztBQUNyQixTQUFTQyxxQkFBcUJDLGdCQUFnQkMsY0FBYztBQUM1RCxPQUFPQyxTQUFTO0FBQ2hCLFNBQVFDLGVBQWM7QUFDdEIsU0FBUUMsaUJBQWdCO0FBQ3hCLFNBQVNDLGFBQWE7QUFDdEIsU0FBUUMsWUFBVztBQUNuQixTQUFRQyxvQkFBbUI7QUFDM0IsT0FBTztBQUlQLE1BQU1DLGFBQWFBLE1BQ2YsdUJBQUMsT0FDRyxpQ0FBQyxZQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FBTyxLQURYO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FFQTtBQUNGQyxLQUpJRDtBQU1OLE1BQU1FLFNBQVNYO0FBQUFBLEVBQW9CO0FBQUEsSUFDL0I7QUFBQSxNQUNJWSxNQUFNO0FBQUEsTUFDTkMsU0FBUyx1QkFBQyxnQkFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGFBQVc7QUFBQSxNQUNwQkMsVUFBVTtBQUFBLFFBQ04sRUFBRUYsTUFBTSxLQUFLQyxTQUFTLHVCQUFDLGFBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFRLEVBQUk7QUFBQSxRQUNsQyxFQUFFRCxNQUFNLGFBQWFDLFNBQVMsdUJBQUMsZUFBRDtBQUFBO0FBQUE7QUFBQTtBQUFBLGVBQVUsRUFBSTtBQUFBLFFBQzVDLEVBQUVELE1BQU0sVUFBVUMsU0FBUyx1QkFBQyxXQUFEO0FBQUE7QUFBQTtBQUFBO0FBQUEsZUFBTSxFQUFJO0FBQUEsUUFDckMsRUFBRUQsTUFBTSxRQUFRQyxTQUFTLHVCQUFDLFVBQUQ7QUFBQTtBQUFBO0FBQUE7QUFBQSxlQUFLLEVBQUk7QUFBQSxNQUFDO0FBQUEsSUFFM0M7QUFBQSxFQUFDO0FBQ0o7QUFFRGQsU0FBU2dCLFdBQVdDLFNBQVNDLGVBQWUsTUFBTSxDQUFDLEVBQUVDO0FBQUFBLEVBQ2pELHVCQUFDLE1BQU0sWUFBTixFQUNHLGlDQUFDLGdCQUNHLGlDQUFDLGtCQUFlLFVBQWhCO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FBK0IsS0FEbkM7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUVBLEtBSEo7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUlBO0FBQ0o7QUFBRSxJQUFBUjtBQUFBUyxhQUFBVCxJQUFBIiwibmFtZXMiOlsiUmVhY3QiLCJSZWFjdERPTSIsImNyZWF0ZUJyb3dzZXJSb3V0ZXIiLCJSb3V0ZXJQcm92aWRlciIsIk91dGxldCIsIkFwcCIsIldlbGNvbWUiLCJCZXZlcmFnZXMiLCJTbmFjayIsIkNhcnQiLCJDYXJ0UHJvdmlkZXIiLCJNYWluTGF5b3V0IiwiX2MiLCJyb3V0ZXIiLCJwYXRoIiwiZWxlbWVudCIsImNoaWxkcmVuIiwiY3JlYXRlUm9vdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJyZW5kZXIiLCIkUmVmcmVzaFJlZyQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZXMiOlsibWFpbi5qc3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tL2NsaWVudCdcclxuaW1wb3J0IHsgY3JlYXRlQnJvd3NlclJvdXRlciwgUm91dGVyUHJvdmlkZXIsIE91dGxldCB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgQXBwIGZyb20gJy4vQXBwLmpzeCc7XHJcbmltcG9ydCB7V2VsY29tZX0gZnJvbSBcIi4vY29tcG9uZW50cy93ZWxjb21lLmpzeFwiO1xyXG5pbXBvcnQge0JldmVyYWdlc30gZnJvbSBcIi4vY29tcG9uZW50cy9CZXZlcmFnZXMuanN4XCI7XHJcbmltcG9ydCB7IFNuYWNrIH0gZnJvbSAnLi9jb21wb25lbnRzL1NuYWNrLmpzeCc7XHJcbmltcG9ydCB7Q2FydH0gZnJvbSAnLi9jb21wb25lbnRzL0NhcnQuanN4JztcclxuaW1wb3J0IHtDYXJ0UHJvdmlkZXJ9IGZyb20gXCIuL2NvbnRleHQvQ2FydENvbnRleHQuanMuanN4XCI7XHJcbmltcG9ydCAnLi9pbmRleC5jc3MnXHJcblxyXG5cclxuXHJcbmNvbnN0IE1haW5MYXlvdXQgPSAoKSA9PiAoXHJcbiAgICA8QXBwPlxyXG4gICAgICAgIDxPdXRsZXQgLz5cclxuICAgIDwvQXBwPlxyXG4pO1xyXG5cclxuY29uc3Qgcm91dGVyID0gY3JlYXRlQnJvd3NlclJvdXRlcihbXHJcbiAgICB7XHJcbiAgICAgICAgcGF0aDogXCIvXCIsXHJcbiAgICAgICAgZWxlbWVudDogPE1haW5MYXlvdXQgLz4sXHJcbiAgICAgICAgY2hpbGRyZW46IFtcclxuICAgICAgICAgICAgeyBwYXRoOiBcIi9cIiwgZWxlbWVudDogPFdlbGNvbWUgLz4gfSxcclxuICAgICAgICAgICAgeyBwYXRoOiBcImJldmVyYWdlc1wiLCBlbGVtZW50OiA8QmV2ZXJhZ2VzIC8+IH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogXCJzbmFja3NcIiwgZWxlbWVudDogPFNuYWNrIC8+IH0sXHJcbiAgICAgICAgICAgIHsgcGF0aDogXCJjYXJ0XCIsIGVsZW1lbnQ6IDxDYXJ0IC8+IH0sXHJcbiAgICAgICAgXSxcclxuICAgIH0sXHJcbl0pO1xyXG5cclxuUmVhY3RET00uY3JlYXRlUm9vdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9vdCcpKS5yZW5kZXIoXHJcbiAgICA8UmVhY3QuU3RyaWN0TW9kZT5cclxuICAgICAgICA8Q2FydFByb3ZpZGVyPlxyXG4gICAgICAgICAgICA8Um91dGVyUHJvdmlkZXIgcm91dGVyPXtyb3V0ZXJ9IC8+XHJcbiAgICAgICAgPC9DYXJ0UHJvdmlkZXI+XHJcbiAgICA8L1JlYWN0LlN0cmljdE1vZGU+XHJcbik7Il0sImZpbGUiOiJDOi9Vc2Vycy9CaWxhbCBEYWRpL0Rlc2t0b3AvWm9kZS9ab2RlX2tpdGNoaW4vc3JjL21haW4uanN4In0=