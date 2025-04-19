declare module "pdfjs-dist/build/pdf.worker.entry" {
    const worker: new () => Worker;
    export default worker;
}
