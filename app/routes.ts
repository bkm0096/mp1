import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    route('/todo', 'layout/todoLayout.tsx', [
        route('add', 'routes/todo/addPage.tsx'),
        route('list', 'routes/todo/listPage.tsx'),
        route('edit/:tno', 'routes/todo/editPage.tsx'),
        route('read/:tno', 'routes/todo/readPage.tsx'),
    ]),
    
] satisfies RouteConfig;
