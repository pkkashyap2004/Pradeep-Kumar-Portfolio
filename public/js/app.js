// App initialization
document.addEventListener('DOMContentLoaded', () => {
    const model = new QueryModel();
    const view = new QueryView();
    const controller = new QueryController(model, view);
});