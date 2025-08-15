import { EditIcon } from "@/assets/images/svgs/edit-icon";
import { Trash2, X } from "lucide-react";
import { useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
    QUESTION_ITEM: "question_item",
};

interface QuestionBankItem {
    id: string;
    question: string;
    order?: number;
}

interface DraggableQuestionRowProps {
    item: QuestionBankItem;
    index: number;
    isSelected: boolean;
    onSelect: (id: string, selected: boolean) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    moveItem: (fromIndex: number, toIndex: number) => void;
}

const DraggableQuestionRow: React.FC<DraggableQuestionRowProps> = ({
    item,
    index,
    isSelected,
    onSelect,
    onEdit,
    onDelete,
    moveItem,
}) => {
    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.QUESTION_ITEM,
        item: { index, id: item.id },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const [, drop] = useDrop({
        accept: ItemTypes.QUESTION_ITEM,
        hover: (dragItem: { index: number; id: string }) => {
            if (dragItem.index !== index) {
                moveItem(dragItem.index, index);
                dragItem.index = index;
            }
        },
    });

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSelect(item.id, e.target.checked);
    };

    const handleEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        onEdit(item.id);
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(item.id);
    };

    const ref = useRef<HTMLDivElement>(null);
    drag(drop(ref));

    return (
        <div
            ref={ref}
            className={`flex items-center border-b border-[#EAECF0] last:border-b-0 hover:bg-[#F9FAFB]/50 transition-colors ${
                isSelected ? "bg-[#E0F2FE]" : ""
            } ${isDragging ? "opacity-50" : ""}`}
        >
            {/* Checkbox */}
            <div className="w-12 flex justify-center py-4">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4 text-[#10B981] bg-gray-100 border-gray-300 rounded focus:ring-[#10B981] focus:ring-2"
                />
            </div>

            {/* Drag Handle */}
            <div className="w-12 flex justify-center py-4 cursor-move">
                <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                </div>
            </div>

            {/* Question Text */}
            <div className="flex-1 py-4 pr-4">
                <div className="text-[#474D63] font-normal text-sm">{item.question}</div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 py-4 pr-4">
                <button
                    onClick={handleEdit}
                    className="bg-[#fff] p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Edit question"
                >
                    <EditIcon className="w-6 h-6 text-gray-500" />
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-[#fff] p-2 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete question"
                >
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
            </div>
        </div>
    );
};

const QuestionBank = () => {
    const [activeTab, setActiveTab] = useState("Media Training");
    const [selectedRowIds, setSelectedRowIds] = useState<Set<string>>(new Set());
    const [questions, setQuestions] = useState<QuestionBankItem[]>([
        {
            id: "1",
            question:
                "Explain the ROI calculation for a marketing campaign with a $5,000 budget that generated $20,000 in sales.",
            order: 1,
        },
        {
            id: "2",
            question: "Describe a time when you successfully helped someone overcome performance anxiety.",
            order: 2,
        },
        {
            id: "3",
            question:
                "Explain the ROI calculation for a marketing campaign with a $5,000 budget that generated $20,000 in sales.",
            order: 3,
        },
        {
            id: "4",
            question: "What are the top 3 elements of an engaging video thumbnail?",
            order: 4,
        },
        {
            id: "5",
            question:
                "Explain the ROI calculation for a marketing campaign with a $5,000 budget that generated $20,000 in sales.",
            order: 5,
        },
        {
            id: "6",
            question: "Describe a time when you successfully helped someone overcome performance anxiety.",
            order: 6,
        },
        {
            id: "7",
            question: "What are the top 3 elements of an engaging video thumbnail?",
            order: 7,
        },
    ]);

    const tabs = ["Media Training", "Coaching", "General Manager"];
    const showSelectionBar = selectedRowIds.size > 0;

    const handleNewQuestion = () => {
        console.log("Creating new question...");
    };

    const handleSelectAll = () => {
        if (selectedRowIds.size === questions.length) {
            // Deselect all
            setSelectedRowIds(new Set());
        } else {
            // Select all
            const allIds = new Set(questions.map((q) => q.id));
            setSelectedRowIds(allIds);
        }
    };

    const handleSelectRow = (id: string, selected: boolean) => {
        const newSelectedIds = new Set(selectedRowIds);
        if (selected) {
            newSelectedIds.add(id);
        } else {
            newSelectedIds.delete(id);
        }
        setSelectedRowIds(newSelectedIds);
    };

    const handleDeleteSelected = () => {
        const filteredQuestions = questions.filter((q) => !selectedRowIds.has(q.id));
        // Update order for remaining questions
        const reorderedQuestions = filteredQuestions.map((q, index) => ({
            ...q,
            order: index + 1,
        }));
        setQuestions(reorderedQuestions);
        setSelectedRowIds(new Set());
    };

    const handleCloseSelectionBar = () => {
        setSelectedRowIds(new Set());
    };

    const handleEditQuestion = (id: string) => {
        console.log("Edit question:", id);
    };

    const handleDeleteQuestion = (id: string) => {
        const filteredQuestions = questions.filter((q) => q.id !== id);
        // Update order for remaining questions
        const reorderedQuestions = filteredQuestions.map((q, index) => ({
            ...q,
            order: index + 1,
        }));
        setQuestions(reorderedQuestions);
        // Remove from selection if it was selected
        const newSelectedIds = new Set(selectedRowIds);
        newSelectedIds.delete(id);
        setSelectedRowIds(newSelectedIds);
    };

    const moveItem = (fromIndex: number, toIndex: number) => {
        const newQuestions = [...questions];
        const [movedItem] = newQuestions.splice(fromIndex, 1);
        newQuestions.splice(toIndex, 0, movedItem);

        // Update order numbers based on new positions
        const updatedQuestions = newQuestions.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        setQuestions(updatedQuestions);
    };

    // Sort questions by order
    const sortedQuestions = [...questions].sort((a, b) => (a.order || 0) - (b.order || 0));

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="p-6 bg-white min-h-screen">
                {/* Header */}
                <div className="flex items-center justify-between pb-6 border-b border-[#EAECF0]">
                    <div>
                        <h1 className="font-medium text-2xl text-[#101828] mb-1">Question Bank</h1>
                        <p className="text-[#667085] text-sm">
                            Customize and manage training questions across verticals
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleNewQuestion}
                            className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-medium text-sm"
                        >
                            New Question
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-6 mt-6 border-b border-[#EAECF0]">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`bg-[#fff] pb-3 px-1 text-sm font-medium transition-colors relative border-b-2 rounded-none ${
                                activeTab === tab
                                    ? "text-[#10B981] border-[#10B981]" // light green text + border
                                    : "text-[#101828] border-transparent hover:text-[#101828]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Selection Bar */}
                {showSelectionBar && (
                    <div className="flex items-center justify-between bg-[#F0F9FF] border border-[#0EA5E9] rounded-lg px-4 py-3 mt-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[#0284C7] font-medium text-sm">{selectedRowIds.size} Selected</span>
                            <button
                                onClick={handleSelectAll}
                                className="bg-[#fff] text-[#64BA9F] text-sm hover:underline"
                            >
                                {selectedRowIds.size === questions.length ? "Deselect all" : "Select all questions"}
                            </button>
                            <button
                                onClick={handleDeleteSelected}
                                className="bg-[#fff] flex items-center gap-1 text-red-600 text-sm hover:underline"
                            >
                                <span className="text-red-600">🗑</span>
                                Delete
                            </button>
                        </div>
                        <button onClick={handleCloseSelectionBar} className="bg-[#fff] p-1 hover:bg-white/50 rounded">
                            <X className="w-4 h-4 text-[#0284C7]" />
                        </button>
                    </div>
                )}

                {/* Question Table */}
                <div className="mt-6 border border-[#EAECF0] rounded-xl shadow-sm overflow-hidden">
                    {sortedQuestions.map((question, index) => (
                        <DraggableQuestionRow
                            key={question.id}
                            item={question}
                            index={index}
                            isSelected={selectedRowIds.has(question.id)}
                            onSelect={handleSelectRow}
                            onEdit={handleEditQuestion}
                            onDelete={handleDeleteQuestion}
                            moveItem={moveItem}
                        />
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default QuestionBank;
