// import { useCallback } from "react";

export interface InitEditorProps {
    initialContainer: HTMLDivElement;
    initialCanvas: any;
};

const useEditor = () => {
    const init = async ({ initialContainer, initialCanvas }: InitEditorProps) => {

    }





    // const init = useCallback(({ initialContainer, initialCanvas }: InitEditorProps) => {

    // }, [])

    return { init }
};

export default useEditor;