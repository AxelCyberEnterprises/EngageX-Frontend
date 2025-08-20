import { EditIcon } from "@/assets/images/svgs/edit-icon";
import { Trash2, X } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
    useFetchEnterpriseQuestions,
    usePatchEnterpriseQuestion,
    useDeleteEnterpriseQuestion,
    EnterpriseQuestion
} from "@/hooks"; // Adjust path as needed
import { Skeleton } from "@/components/ui/skeleton";
import emptyStateImage from "@/assets/images/svgs/empty-state.svg";
import { Button } from "@/components/ui/button";
import DeleteModal from "@/components/modals/modalVariants/DeleteModal";
import { EditQuestionModal } from "@/components/modals/modalVariants/EditQuestionalModal";
import { useCreateEnterpriseQuestion } from "@/hooks";
import { CreateEnterpriseQuestionData } from "@/hooks/organization/useCreateEnterpriseQuestion";
import { CreateQuestionFormData, CreateQuestionModal } from "@/components/modals/modalVariants/CreateQuestionsModal";

const ItemTypes = {
    QUESTION_ITEM: "question_item",
};

interface DraggableQuestionRowProps {
    item: EnterpriseQuestion;
    index: number;
    isSelected: boolean;
    onSelect: (id: number, selected: boolean) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
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
        hover: (dragItem: { index: number; id: number }) => {
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
            className={`flex flex-col sm:flex-row items-start sm:items-center border border-[#EAECF0] rounded-xl mb-4 cursor-pointer hover:bg-[#F9FAFB]/50 transition-colors ${isSelected ? "bg-[#E0F2FE]" : ""
                } ${isDragging ? "opacity-50" : ""}`}
        >
            {/* Mobile Layout */}
            <div className="flex w-full sm:hidden p-4">
                {/* Checkbox and Drag Handle */}
                <div className="flex items-center gap-3 mr-4">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#10B981] bg-gray-100 border-gray-300 rounded cursor-pointer"
                    />
                    <div className="cursor-move">
                        <div className="grid grid-cols-2 gap-0.5 w-3 h-3">
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Question Content */}
                <div className="flex gap-4">
                    <div className="text-[#474D63] font-normal text-sm mb-3">{item.question_text}</div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleEdit}
                            className="bg-[#fff] hover:bg-gray-100 rounded-lg transition-colors"
                            title="Edit question"
                        >
                            <EditIcon className="w-6 h-6 text-gray-500" />
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-[#fff] hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete question"
                        >
                            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex w-full items-center">
                {/* Checkbox */}
                <div className="w-12 flex justify-center py-4">
                    <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-[#10B981] bg-gray-100 border-gray-300 rounded cursor-pointer"
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
                    <div className="text-[#474D63] font-normal text-sm">{item.question_text}</div>
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
        </div>
    );
};

const QuestionRowSkeleton: React.FC = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center border border-[#EAECF0] rounded-xl mb-4 p-4">
        <div className="flex w-full sm:hidden">
            <div className="flex items-center gap-3 mr-4">
                <Skeleton className="w-4 h-4 rounded" />
                <Skeleton className="w-3 h-3" />
            </div>
            <div className="flex-1">
                <Skeleton className="h-4 w-full mb-3" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex gap-2">
                    <Skeleton className="w-9 h-9 rounded-lg" />
                    <Skeleton className="w-9 h-9 rounded-lg" />
                </div>
            </div>
        </div>

        <div className="hidden sm:flex w-full items-center">
            <div className="w-12 flex justify-center py-4">
                <Skeleton className="w-4 h-4 rounded" />
            </div>
            <div className="w-12 flex justify-center py-4">
                <Skeleton className="w-3 h-3" />
            </div>
            <div className="flex-1 py-4 pr-4">
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex items-center gap-2 py-4 pr-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-10 h-10 rounded-lg" />
            </div>
        </div>
    </div>
);

const QuestionBank: React.FC = () => {
    const searchParams = new URLSearchParams(location.search);
    const enterpriseId = Number(searchParams.get("id"));
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [activeTab, setActiveTab] = useState<string>("Coaching");
    const [selectedRowIds, setSelectedRowIds] = useState<Set<number>>(new Set());
    const [localQuestions, setLocalQuestions] = useState<EnterpriseQuestion[]>([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<EnterpriseQuestion | null>(null);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const createQuestionMutation = useCreateEnterpriseQuestion(enterpriseId);
    // API hooks
    const getVerticalFromTab = (tab: string) => {
        const tabToVerticalMap: Record<string, string> = {
            "Media Training": "media_training",
            "Coaching": "coach",
            "General Manager": "general_manager"
        };
        return tabToVerticalMap[tab];
    };
    const { data: questionsResponse, isLoading, error, refetch } = useFetchEnterpriseQuestions(
        enterpriseId,
        currentPage,
        getVerticalFromTab(activeTab)
    );
    const updateQuestionMutation = usePatchEnterpriseQuestion(enterpriseId);
    const deleteQuestionMutation = useDeleteEnterpriseQuestion(enterpriseId);

    useEffect(() => {
        if (questionsResponse?.results) {
            const questionsWithOrder: EnterpriseQuestion[] = questionsResponse.results.map((q, index) => ({
                ...q,
                order: q.order || index + 1
            }));
            setLocalQuestions(questionsWithOrder);
        }
    }, [questionsResponse]);

    // Reset pagination when tab changes
    useEffect(() => {
        setCurrentPage(1);
        setSelectedRowIds(new Set()); // Clear selections when switching tabs
    }, [activeTab]);

    const tabs = ["Media Training", "Coaching", "General Manager"];
    const showSelectionBar = selectedRowIds.size > 0;

    const handleNewQuestion = () => {
        setShowCreateModal(true);
    };

    // Add this new function:
    const handleCreateQuestion = async (formData: CreateQuestionFormData) => {
        const getVerticalFromTab = (tab: string) => {
            const tabToVerticalMap: Record<string, string> = {
                "Media Training": "media_training",
                "Coaching": "coach",
                "General Manager": "gm"
            };
            return tabToVerticalMap[tab];
        };

        const newQuestionData: CreateEnterpriseQuestionData = {
            enterprise: enterpriseId,
            vertical: getVerticalFromTab(activeTab),
            question_text: formData.questionText,
            sport_type: formData.sportType || null,
            is_active: true,
        };

        try {
            await createQuestionMutation.mutateAsync(newQuestionData);
            setShowCreateModal(false);
            // The cache will be updated automatically via onSuccess in the hook
        } catch (error) {
            console.error("Error creating question:", error);
            // Handle error - show toast notification, etc.
        }
    };

    const handleSelectAll = () => {
        if (selectedRowIds.size === localQuestions.length) {
            setSelectedRowIds(new Set());
        } else {
            const allIds = new Set(localQuestions.map((q) => q.id));
            setSelectedRowIds(allIds);
        }
    };

    const handleSelectRow = (id: number, selected: boolean) => {
        const newSelectedIds = new Set(selectedRowIds);
        if (selected) {
            newSelectedIds.add(id);
        } else {
            newSelectedIds.delete(id);
        }
        setSelectedRowIds(newSelectedIds);
    };

    const handleDeleteSelected = async () => {
        const deletePromises = Array.from(selectedRowIds).map(id =>
            deleteQuestionMutation.mutateAsync(id)
        );

        try {
            await Promise.all(deletePromises);
            setSelectedRowIds(new Set());
        } catch (error) {
            console.error("Error deleting questions:", error);
            // Handle error - show toast notification, etc.
        }
    };

    const handleCloseSelectionBar = () => {
        setSelectedRowIds(new Set());
    };

    const handleEditQuestion = (id: number) => {
        const questionToEdit = localQuestions.find((q) => q.id === id);
        if (questionToEdit) {
            setEditingQuestion(questionToEdit);
            setShowEditModal(true);
        }
    };

    const handleSaveEditQuestion = async (questionText: string) => {
        if (!editingQuestion) return;

        try {
            await updateQuestionMutation.mutateAsync({
                id: editingQuestion.id,
                data: { question_text: questionText },
            });
            setShowEditModal(false);
            setEditingQuestion(null);
            refetch();
        } catch (error) {
            console.error("Error updating question:", error);
        }
    };

    const handleDeleteQuestion = async (id: number) => {
        try {
            await deleteQuestionMutation.mutateAsync(id);
            setShowDeleteModal(false);
            refetch();
            const newSelectedIds = new Set(selectedRowIds);
            newSelectedIds.delete(id);
            setSelectedRowIds(newSelectedIds);
        } catch (error) {
            console.error("Error deleting question:", error);
            // Handle error - show toast notification, etc.
        }
    };

    const handleConfirmDelete = (id: number | null) => {
        if (id) {
            handleDeleteQuestion(id);
        } else {
            handleDeleteSelected();
        }
    };

    const handleOpenDeleteModal = (id?: number | null) => {
        if (id) {
            setSelectedQuestionId(id);
        }
        setShowDeleteModal(true);
    };

    const moveItem = async (fromIndex: number, toIndex: number) => {
        const newQuestions = [...localQuestions];
        const [movedItem] = newQuestions.splice(fromIndex, 1);
        newQuestions.splice(toIndex, 0, movedItem);

        // Update local state immediately for smooth UX
        const updatedQuestions = newQuestions.map((item, index) => ({
            ...item,
            order: index + 1,
        }));

        // Update the local state
        const allQuestionsUpdated = localQuestions.map(q => {
            const updated = updatedQuestions.find(uq => uq.id === q.id);
            return updated || q;
        });
        setLocalQuestions(allQuestionsUpdated);

        // Update the moved item's order in the API
        try {
            await updateQuestionMutation.mutateAsync({
                id: movedItem.id,
                data: { order: toIndex + 1 }
            });
        } catch (error) {
            console.error("Error updating question order:", error);
            // Optionally revert the local change or show error
        }
    };

    // Sort questions by order
    const sortedQuestions = [...localQuestions].sort((a, b) => (a.order || 0) - (b.order || 0));

    if (isLoading) {
        return (
            <div className="p-4 sm:p-6 bg-white min-h-screen">
                {/* Header Skeleton */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAECF0] gap-4">
                    <div className="flex-1">
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-80" />
                    </div>
                    <Skeleton className="h-10 w-32" />
                </div>

                {/* Tabs Skeleton */}
                <div className="flex gap-6 mt-6 border-b border-[#EAECF0] overflow-x-auto">
                    {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-6 w-24 mb-3 flex-shrink-0" />
                    ))}
                </div>

                {/* Question Rows Skeleton */}
                <div className="mt-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <QuestionRowSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 sm:p-6 bg-white min-h-screen">
                <div className="flex items-center justify-center h-64">
                    <div className="text-red-600 text-center">
                        <div className="text-lg font-medium mb-2">Error loading questions</div>
                        <div className="text-sm">Please try again later</div>
                    </div>
                </div>
            </div>
        );
    }

    // Calculate pagination values for current tab's filtered questions
    const totalCount = questionsResponse?.count || 0;
    const pageSize = 10; // Adjust based on your API's page size
    const pageCount = Math.ceil(totalCount / pageSize);
    const currentPageItemCount = questionsResponse?.results?.length || 0;
    const startItem = totalCount > 0 ? (currentPage - 1) * pageSize + 1 : 0;
    const endItem = (currentPage - 1) * pageSize + currentPageItemCount;

    console.log("Editing question:", editingQuestion?.question_text);

    return (
        <>
            <CreateQuestionModal
                show={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSubmit={handleCreateQuestion}
                isLoading={createQuestionMutation.isPending}
                activeTab={activeTab}
            />
            <DeleteModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onDelete={() => handleConfirmDelete(selectedQuestionId)}
                title="Delete Goal"
                message="Are you sure you want to delete this training goal? This action cannot be undone."
            />
            <EditQuestionModal
                show={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setEditingQuestion(null);
                }}
                defaultValue={editingQuestion?.question_text}
                onSubmit={handleSaveEditQuestion}
            />
            <DndProvider backend={HTML5Backend}>
                <div className="p-4 sm:p-6 bg-white min-h-screen">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#EAECF0] gap-4">
                        <div className="flex-1">
                            <h1 className="font-medium text-xl sm:text-2xl text-[#101828] mb-1">Question Bank</h1>
                            <p className="text-[#667085] text-sm">
                                Customize and manage training questions across verticals
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleNewQuestion}
                                className="flex items-center gap-2 px-4 py-2 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors font-medium text-sm w-full sm:w-auto justify-center"
                            >
                                New Question
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 mt-6 border-b border-[#EAECF0] overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`bg-[#fff] pb-3 px-1 text-sm font-medium transition-colors relative border-b-2 rounded-none whitespace-nowrap flex-shrink-0 ${activeTab === tab
                                    ? "text-[#10B981] border-[#10B981]"
                                    : "text-[#101828] border-transparent hover:text-[#101828]"
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Selection Bar */}
                    {showSelectionBar && (
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[#F0F9FF] border border-[#0EA5E9] rounded-lg px-4 py-3 mt-6 gap-3">
                            <div className="flex flex-wrap items-center gap-4">
                                <span className="text-[#0284C7] font-medium text-sm">{selectedRowIds.size} Selected</span>
                                <button
                                    onClick={handleSelectAll}
                                    className="bg-[#fff] text-[#64BA9F] text-sm hover:underline"
                                >
                                    {selectedRowIds.size === localQuestions.length ? "Deselect all" : "Select all questions"}
                                </button>
                                <button
                                    onClick={() => handleOpenDeleteModal()}
                                    className="bg-[#fff] flex items-center gap-1 text-red-600 text-sm hover:underline"
                                    disabled={deleteQuestionMutation.isPending}
                                >
                                    <span className="text-red-600">🗑</span>
                                    {deleteQuestionMutation.isPending ? "Deleting..." : "Delete"}
                                </button>
                            </div>
                            <button onClick={handleCloseSelectionBar} className="bg-[#fff] p-1 hover:bg-white/50 rounded self-end sm:self-center">
                                <X className="w-4 h-4 text-[#0284C7]" />
                            </button>
                        </div>
                    )}

                    {/* Question Table */}
                    <div className="mt-6 overflow-hidden">
                        {sortedQuestions.length === 0 ? (
                            <div className="p-8 text-center text-[#667085] flex flex-col items-center">
                                <div
                                    className="justify-center items-center w-full mx-auto py-[5%] flex-col gap-4 text-center"
                                >
                                    <img src={emptyStateImage} className="w-28 mx-auto" alt="empty state logo" />
                                    <p className="text-lg font-medium">No questions found for {activeTab}. </p>
                                    <p
                                        onClick={handleNewQuestion}
                                        className="text-[#10B981] ml-1 cursor-pointer mt-4"
                                    >
                                        Create your first question.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            sortedQuestions.map((question, index) => (
                                <DraggableQuestionRow
                                    key={question.id}
                                    item={question}
                                    index={index}
                                    isSelected={selectedRowIds.has(question.id)}
                                    onSelect={handleSelectRow}
                                    onEdit={handleEditQuestion}
                                    onDelete={() => handleOpenDeleteModal(question.id)}
                                    moveItem={moveItem}
                                />
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {totalCount > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between mt-6 gap-4">
                            <div className="text-sm text-[#667085] text-center sm:text-left">
                                Showing {startItem}-{endItem} of {totalCount} questions in {activeTab}
                            </div>
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                    onClick={() => setCurrentPage(prev => prev - 1)}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 text-sm text-[#667085] hover:text-[#10B981] bg-transparent hover:bg-transparent shadow-none"
                                >
                                    Previous
                                </Button>
                                <span className="text-base text-[#667085] rounded-full border border-[#EAECF0] grid place-content-center w-10 h-10 bg-[#00000014]">
                                    {currentPage}
                                </span>
                                <Button
                                    onClick={() => setCurrentPage(prev => prev + 1)}
                                    disabled={currentPage >= pageCount}
                                    className="px-3 py-1 text-sm text-[#667085] hover:text-[#10B981] bg-transparent hover:bg-transparent shadow-none"
                                >
                                    Next
                                </Button>

                            </div>
                        </div>
                    )}
                </div>
            </DndProvider>
        </>

    );
};

export default QuestionBank;