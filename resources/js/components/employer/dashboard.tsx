// //
// // import React, { useState, useEffect, useCallback } from 'react';
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// // import { JobSeekerPagination, JobSeekerProfile } from '@/types/jobseeker';
// // import { JobseekerCard } from '@/components/employer/jobseeker-list';
// // import { Inbox, Loader2, Search, SlidersHorizontal } from 'lucide-react';
// // import { Input } from '@/components/ui/input';
// // import { Button } from '@/components/ui/button';
// // import { router, usePage } from '@inertiajs/react';
// // import { motion } from 'framer-motion';
// // import { Recommended, RecommendedPagination } from '@/types/employer';
// // import { toast } from 'sonner';
// // import JobseekerPaginate from '@/components/jobseeker-paginate';
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// // import { Label } from '@/components/ui/label';
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// // import { Badge } from '@/components/ui/badge';
// // import { debounce } from 'lodash';
// // import { SharedData } from '@/types';
// // import { industries } from '@/lib/jobseeker.data';
// //
// // interface FilterState {
// //     search: string;
// //     industry: string | null;
// // }
// //
// // export default function EmployerDashboard({ jobseekers,recommended }: { jobseekers: JobSeekerPagination ,recommended:RecommendedPagination}) {
// //     const { filters } = usePage<SharedData & { filters: FilterState; }>().props;
// //     const {vacanciesId} = usePage<SharedData & {vacanciesId:number[]}>().props
// //     const [searchTerm, setSearchTerm] = useState<string>(filters?.search || '');
// //     const [showFilters, setShowFilters] = useState(false);
// //     const [activeFilters, setActiveFilters] = useState<FilterState>({
// //         search: filters?.search || '',
// //         industry: filters?.industry || null,
// //     });
// //     const [isSearching, setIsSearching] = useState(false);
// //
// //     // Debounced function to update URL with filters
// //     const updateFilters = useCallback(
// //         debounce((filters: FilterState) => {
// //             const params: Record<string, any> = {};
// //             if (filters.search) params.search = filters.search;
// //             if (filters.industry) params.industry = filters.industry;
// //
// //             router.get(route('dashboard'), params, {
// //                 preserveState: true,
// //                 preserveScroll: true,
// //                 onSuccess: () => {
// //                     toast.success('Фильтры и поиск применены');
// //                 },
// //                 onError: () => {
// //                     toast.error('Ошибка при применении фильтров или поиска');
// //                 },
// //             });
// //         }, 300),
// //         []
// //     );
// //
// //     // Sync filters with URL
// //     useEffect(() => {
// //         const updatedFilters = { ...activeFilters, search: searchTerm };
// //         updateFilters(updatedFilters);
// //         return () => {
// //             updateFilters.cancel();
// //         };
// //     }, [searchTerm, activeFilters, updateFilters]);
// //
// //     const hasActiveFilters = () => {
// //         return activeFilters.search || activeFilters.industry !== null;
// //     };
// //
// //     const handleResetFilters = () => {
// //         const resetFilters = {
// //             search: '',
// //             industry: null,
// //         };
// //         setActiveFilters(resetFilters);
// //         setSearchTerm('');
// //         updateFilters(resetFilters);
// //         toast.info('Фильтры и поиск сброшены');
// //     };
// //
// //     const handleApplyFilters = (filters: FilterState) => {
// //         setActiveFilters(filters);
// //         setShowFilters(false);
// //         updateFilters(filters);
// //         toast.success('Фильтры применены');
// //     };
// //
// //     const searchCandidates = ()=>{
// //         setIsSearching(true)
// //
// //         router.post(route('recommended.user'),{vacancyIds:vacanciesId},{
// //             onSuccess:()=>{
// //                 if (vacanciesId.length===0){
// //                     toast.info('У вас нету пока вакансий для того чтобы найты рекомендующие кандитатов')
// //                 }else {
// //                     toast.success('Рекемендации успешно нашлись')
// //                 }
// //             },
// //             onError:()=>{
// //                 toast.error('Произошла ошибка во время поиска')
// //             }
// //         })
// //         setIsSearching(false)
// //     }
// //
// //     return (
// //         <div className="">
// //             <Tabs defaultValue="search" className="">
// //                 <TabsList className="grid w-full grid-cols-2">
// //                     <TabsTrigger value="search">Поиск кандидатов</TabsTrigger>
// //                     <TabsTrigger value="recommended">Рекомендованные</TabsTrigger>
// //                 </TabsList>
// //                 <TabsContent value="search" className="space-y-6">
// //                     <div className="mt-4 flex gap-4">
// //                         <div className="relative flex-1">
// //                             <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
// //                             <Input
// //                                 placeholder="Поиск кандидатов по имени, навыкам, опыту, образованию..."
// //                                 value={searchTerm}
// //                                 onChange={(e) => setSearchTerm(e.target.value)}
// //                                 className="pl-10"
// //                             />
// //                         </div>
// //                         <Dialog open={showFilters} onOpenChange={setShowFilters}>
// //                             <DialogTrigger asChild>
// //                                 <Button
// //                                     variant="outline"
// //                                     className={hasActiveFilters() ? 'border-primary text-primary' : ''}
// //                                 >
// //                                     <SlidersHorizontal className="h-4 w-4 mr-2" />
// //                                     Фильтры
// //                                     {hasActiveFilters() && (
// //                                         <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
// //                                             !
// //                                         </Badge>
// //                                     )}
// //                                 </Button>
// //                             </DialogTrigger>
// //                             <DialogContent>
// //                                 <DialogHeader>
// //                                     <DialogTitle>Фильтры кандидатов</DialogTitle>
// //                                 </DialogHeader>
// //                                 <div className="space-y-4">
// //                                     <div>
// //                                         <Label>Отрасль</Label>
// //                                         <Select
// //                                             value={activeFilters.industry || 'all'}
// //                                             onValueChange={(value) =>
// //                                                 setActiveFilters({ ...activeFilters, industry: value === 'all' ? null : value })
// //                                             }
// //                                         >
// //                                             <SelectTrigger>
// //                                                 <SelectValue placeholder="Выберите отрасль" />
// //                                             </SelectTrigger>
// //                                             <SelectContent>
// //                                                 <SelectItem value="all">Все отрасли</SelectItem>
// //                                                 {industries.map((industry) => (
// //                                                     <SelectItem key={industry.id} value={industry.id.toString()}>
// //                                                         {industry.name}
// //                                                     </SelectItem>
// //                                                 ))}
// //                                             </SelectContent>
// //                                         </Select>
// //                                     </div>
// //                                     <div className="flex gap-2">
// //                                         <Button onClick={() => handleApplyFilters(activeFilters)}>Применить</Button>
// //                                         <Button variant="outline" onClick={handleResetFilters}>Сбросить</Button>
// //                                     </div>
// //                                 </div>
// //                             </DialogContent>
// //                         </Dialog>
// //                         {hasActiveFilters() && (
// //                             <Button variant="ghost" onClick={handleResetFilters}>
// //                                 Сбросить
// //                             </Button>
// //                         )}
// //                     </div>
// //                     {hasActiveFilters() && (
// //                         <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
// //                             <span className="text-sm font-medium">Активные фильтры:</span>
// //                             {activeFilters.search && (
// //                                 <Badge variant="secondary">Поиск: {activeFilters.search}</Badge>
// //                             )}
// //                             {activeFilters.industry && (
// //                                 <Badge variant="secondary">
// //                                     Отрасль: {industries.find((i) => i.id.toString() === activeFilters.industry)?.name || ''}
// //                                 </Badge>
// //                             )}
// //                         </div>
// //                     )}
// //                     <div className="flex justify-between items-center">
// //                         <p className="text-sm text-muted-foreground">
// //                             {/*Найдено {jobseekers.data.length}{' '}*/}
// //                             {/*{jobseekers.data.length === 1 ? 'кандидат' : 'кандидатов'}*/}
// //                         </p>
// //                     </div>
// //                     {jobseekers.data.length === 0 ? (
// //                         <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
// //                             <Inbox className="h-16 w-16 text-muted-foreground" />
// //                             <span>Пока нет кандидатов</span>
// //                         </div>
// //                     ) : (
// //                         <>
// //                             {jobseekers.data.map((jobseeker: JobSeekerProfile, index) => (
// //                                 <JobseekerCard key={index} jobseeker={jobseeker} />
// //                             ))}
// //                             <div className="flex justify-end">
// //                                 <JobseekerPaginate data={jobseekers} />
// //                             </div>
// //                         </>
// //                     )}
// //                 </TabsContent>
// //                 <TabsContent value="recommended" className="space-y-6">
// //                     {recommended.data.length === 0 ? (
// //                         <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
// //                             <Inbox className="h-16 w-16 text-muted-foreground" />
// //                             <span>Пока нет рекемендационных кандидатов</span>
// //                             <motion.button
// //                                 onClick={searchCandidates}
// //                                 disabled={isSearching}
// //                                 whileTap={{ scale: 0.95 }}
// //                                 whileHover={{ scale: 1.05 }}
// //                                 animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
// //                                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
// //                                 className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
// //                             >
// //                                 {isSearching && (
// //                                     <span className="animate-spin inline-block">
// //                                             <Loader2 />
// //                                         </span>
// //                                 )}
// //                                 Начать поиск
// //                             </motion.button>
// //                         </div>
// //                     ) : (
// //                         <>
// //                             <div className="flex items-center justify-end mt-4">
// //                                 <motion.button
// //                                     onClick={searchCandidates}
// //                                     disabled={isSearching}
// //                                     whileTap={{ scale: 0.95 }}
// //                                     whileHover={{ scale: 1.05 }}
// //                                     animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
// //                                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
// //                                     className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
// //                                 >
// //                                     {isSearching && (
// //                                         <span className="animate-spin inline-block">
// //                                                 <Loader2 />
// //                                             </span>
// //                                     )}
// //                                     Начать поиск
// //                                 </motion.button>
// //                             </div>
// //                             {recommended.data.map((recommend: Recommended, index) => (
// //                                 <JobseekerCard vacancy={recommend.vacancy} showScore={true} score={recommend.score} key={index}
// //                                                jobseeker={recommend.jobseeker} />
// //                             ))}
// //                             <div className="flex justify-end">
// //                                 <JobseekerPaginate data={jobseekers} />
// //                             </div>
// //                         </>
// //                     )}
// //                 </TabsContent>
// //             </Tabs>
// //         </div>
// //     );
// // }
//
// import React, { useState, useEffect, useCallback } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { JobSeekerPagination, JobSeekerProfile } from '@/types/jobseeker';
// import { JobseekerCard } from '@/components/employer/jobseeker-list';
// import { Inbox, Loader2, Search, SlidersHorizontal } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { router, usePage } from '@inertiajs/react';
// import { motion } from 'framer-motion';
// import { Recommended, RecommendedPagination } from '@/types/employer';
// import { toast } from 'sonner';
// import JobseekerPaginate from '@/components/jobseeker-paginate';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { debounce } from 'lodash';
// import { SharedData } from '@/types';
// import { industries } from '@/lib/jobseeker.data';
//
// interface FilterState {
//     search: string;
//     industry: string | null;
// }
//
// export default function EmployerDashboard({ jobseekers, recommended }: { jobseekers: JobSeekerPagination, recommended: RecommendedPagination }) {
//     const { filters } = usePage<SharedData & { filters: FilterState; }>().props;
//     const { vacanciesId } = usePage<SharedData & { vacanciesId: number[] }>().props;
//     const [searchTerm, setSearchTerm] = useState<string>(filters?.search || '');
//     const [recommendedSearchTerm, setRecommendedSearchTerm] = useState<string>(filters?.search || '');
//     const [showFilters, setShowFilters] = useState(false);
//     const [showRecommendedFilters, setShowRecommendedFilters] = useState(false);
//     const [activeFilters, setActiveFilters] = useState<FilterState>({
//         search: filters?.search || '',
//         industry: filters?.industry || null,
//     });
//     const [recommendedActiveFilters, setRecommendedActiveFilters] = useState<FilterState>({
//         search: filters?.search || '',
//         industry: filters?.industry || null,
//     });
//     const [isSearching, setIsSearching] = useState(false);
//
//     // Debounced function to update URL with filters for search tab
//     const updateFilters = useCallback(
//         debounce((filters: FilterState) => {
//             const params: Record<string, any> = {};
//             if (filters.search) params.search = filters.search;
//             if (filters.industry) params.industry = filters.industry;
//
//             router.get(route('dashboard'), params, {
//                 preserveState: true,
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     toast.success('Фильтры и поиск применены');
//                 },
//                 onError: () => {
//                     toast.error('Ошибка при применении фильтров или поиска');
//                 },
//             });
//         }, 300),
//         []
//     );
//
//     // Debounced function to update URL with filters for recommended tab
//     const updateRecommendedFilters = useCallback(
//         debounce((filters: FilterState) => {
//             const params: Record<string, any> = {};
//             if (filters.search) params.search = filters.search;
//             if (filters.industry) params.industry = filters.industry;
//
//             router.get(route('dashboard'), { ...params, tab: 'recommended' }, {
//                 preserveState: true,
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     toast.success('Фильтры и поиск применены для рекомендованных');
//                 },
//                 onError: () => {
//                     toast.error('Ошибка при применении фильтров или поиска');
//                 },
//             });
//         }, 300),
//         []
//     );
//
//     // Sync filters with URL for search tab
//     useEffect(() => {
//         const updatedFilters = { ...activeFilters, search: searchTerm };
//         updateFilters(updatedFilters);
//         return () => {
//             updateFilters.cancel();
//         };
//     }, [searchTerm, activeFilters, updateFilters]);
//
//     // Sync filters with URL for recommended tab
//     useEffect(() => {
//         const updatedFilters = { ...recommendedActiveFilters, search: recommendedSearchTerm };
//         updateRecommendedFilters(updatedFilters);
//         return () => {
//             updateRecommendedFilters.cancel();
//         };
//     }, [recommendedSearchTerm, recommendedActiveFilters, updateRecommendedFilters]);
//
//     const hasActiveFilters = () => {
//         return activeFilters.search || activeFilters.industry !== null;
//     };
//
//     const hasRecommendedActiveFilters = () => {
//         return recommendedActiveFilters.search || recommendedActiveFilters.industry !== null;
//     };
//
//     const handleResetFilters = () => {
//         const resetFilters = {
//             search: '',
//             industry: null,
//         };
//         setActiveFilters(resetFilters);
//         setSearchTerm('');
//         updateFilters(resetFilters);
//         toast.info('Фильтры и поиск сброшены');
//     };
//
//     const handleResetRecommendedFilters = () => {
//         const resetFilters = {
//             search: '',
//             industry: null,
//         };
//         setRecommendedActiveFilters(resetFilters);
//         setRecommendedSearchTerm('');
//         updateRecommendedFilters(resetFilters);
//         toast.info('Фильтры и поиск сброшены для рекомендованных');
//     };
//
//     const handleApplyFilters = (filters: FilterState) => {
//         setActiveFilters(filters);
//         setShowFilters(false);
//         updateFilters(filters);
//         toast.success('Фильтры применены');
//     };
//
//     const handleApplyRecommendedFilters = (filters: FilterState) => {
//         setRecommendedActiveFilters(filters);
//         setShowRecommendedFilters(false);
//         updateRecommendedFilters(filters);
//         toast.success('Фильтры применены для рекомендованных');
//     };
//
//     const searchCandidates = () => {
//         setIsSearching(true);
//
//         router.post(route('recommended.user'), { vacancyIds: vacanciesId }, {
//             onSuccess: () => {
//                 if (vacanciesId.length === 0) {
//                     toast.info('У вас нету пока вакансий для того чтобы найти рекомендующих кандидатов');
//                 } else {
//                     toast.success('Рекомендации успешно найдены');
//                 }
//             },
//             onError: () => {
//                 toast.error('Произошла ошибка во время поиска');
//             },
//             onFinish: () => {
//                 setIsSearching(false);
//             }
//         });
//     };
//
//     return (
//         <div className="">
//             <Tabs defaultValue="search" className="">
//                 <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="search">Поиск кандидатов</TabsTrigger>
//                     <TabsTrigger value="recommended">Рекомендованные</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="search" className="space-y-6">
//                     <div className="mt-4 flex gap-4">
//                         <div className="relative flex-1">
//                             <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
//                             <Input
//                                 placeholder="Поиск кандидатов по имени, навыкам, опыту, образованию..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="pl-10"
//                             />
//                         </div>
//                         <Dialog open={showFilters} onOpenChange={setShowFilters}>
//                             <DialogTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className={hasActiveFilters() ? 'border-primary text-primary' : ''}
//                                 >
//                                     <SlidersHorizontal className="h-4 w-4 mr-2" />
//                                     Фильтры
//                                     {hasActiveFilters() && (
//                                         <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
//                                             !
//                                         </Badge>
//                                     )}
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Фильтры кандидатов</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <Label>Отрасль</Label>
//                                         <Select
//                                             value={activeFilters.industry || 'all'}
//                                             onValueChange={(value) =>
//                                                 setActiveFilters({ ...activeFilters, industry: value === 'all' ? null : value })
//                                             }
//                                         >
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Выберите отрасль" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="all">Все отрасли</SelectItem>
//                                                 {industries.map((industry) => (
//                                                     <SelectItem key={industry.id} value={industry.id.toString()}>
//                                                         {industry.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button onClick={() => handleApplyFilters(activeFilters)}>Применить</Button>
//                                         <Button variant="outline" onClick={handleResetFilters}>Сбросить</Button>
//                                     </div>
//                                 </div>
//                             </DialogContent>
//                         </Dialog>
//                         {hasActiveFilters() && (
//                             <Button variant="ghost" onClick={handleResetFilters}>
//                                 Сбросить
//                             </Button>
//                         )}
//                     </div>
//                     {hasActiveFilters() && (
//                         <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
//                             <span className="text-sm font-medium">Активные фильтры:</span>
//                             {activeFilters.search && (
//                                 <Badge variant="secondary">Поиск: {activeFilters.search}</Badge>
//                             )}
//                             {activeFilters.industry && (
//                                 <Badge variant="secondary">
//                                     Отрасль: {industries.find((i) => i.id.toString() === activeFilters.industry)?.name || ''}
//                                 </Badge>
//                             )}
//                         </div>
//                     )}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm text-muted-foreground">
//                             {/*Найдено {jobseekers.data.length}{' '}*/}
//                             {/*{jobseekers.data.length === 1 ? 'кандидат' : 'кандидатов'}*/}
//                         </p>
//                     </div>
//                     {jobseekers.data.length === 0 ? (
//                         <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
//                             <Inbox className="h-16 w-16 text-muted-foreground" />
//                             <span>Пока нет кандидатов</span>
//                         </div>
//                     ) : (
//                         <>
//                             {jobseekers.data.map((jobseeker: JobSeekerProfile, index) => (
//                                 <JobseekerCard key={index} jobseeker={jobseeker} />
//                             ))}
//                             <div className="flex justify-end">
//                                 <JobseekerPaginate data={jobseekers} />
//                             </div>
//                         </>
//                     )}
//                 </TabsContent>
//                 <TabsContent value="recommended" className="space-y-6">
//                     <div className="mt-4 flex gap-4">
//                         <div className="relative flex-1">
//                             <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
//                             <Input
//                                 placeholder="Поиск рекомендованных кандидатов по имени, навыкам, опыту, образованию..."
//                                 value={recommendedSearchTerm}
//                                 onChange={(e) => setRecommendedSearchTerm(e.target.value)}
//                                 className="pl-10"
//                             />
//                         </div>
//                         <Dialog open={showRecommendedFilters} onOpenChange={setShowRecommendedFilters}>
//                             <DialogTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className={hasRecommendedActiveFilters() ? 'border-primary text-primary' : ''}
//                                 >
//                                     <SlidersHorizontal className="h-4 w-4 mr-2" />
//                                     Фильтры
//                                     {hasRecommendedActiveFilters() && (
//                                         <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
//                                             !
//                                         </Badge>
//                                     )}
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Фильтры рекомендованных кандидатов</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <Label>Отрасль</Label>
//                                         <Select
//                                             value={recommendedActiveFilters.industry || 'all'}
//                                             onValueChange={(value) =>
//                                                 setRecommendedActiveFilters({ ...recommendedActiveFilters, industry: value === 'all' ? null : value })
//                                             }
//                                         >
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Выберите отрасль" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="all">Все отрасли</SelectItem>
//                                                 {industries.map((industry) => (
//                                                     <SelectItem key={industry.id} value={industry.id.toString()}>
//                                                         {industry.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button onClick={() => handleApplyRecommendedFilters(recommendedActiveFilters)}>Применить</Button>
//                                         <Button variant="outline" onClick={handleResetRecommendedFilters}>Сбросить</Button>
//                                     </div>
//                                 </div>
//                             </DialogContent>
//                         </Dialog>
//                         {hasRecommendedActiveFilters() && (
//                             <Button variant="ghost" onClick={handleResetRecommendedFilters}>
//                                 Сбросить
//                             </Button>
//                         )}
//                     </div>
//                     {hasRecommendedActiveFilters() && (
//                         <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
//                             <span className="text-sm font-medium">Активные фильтры:</span>
//                             {recommendedActiveFilters.search && (
//                                 <Badge variant="secondary">Поиск: {recommendedActiveFilters.search}</Badge>
//                             )}
//                             {recommendedActiveFilters.industry && (
//                                 <Badge variant="secondary">
//                                     Отрасль: {industries.find((i) => i.id.toString() === recommendedActiveFilters.industry)?.name || ''}
//                                 </Badge>
//                             )}
//                         </div>
//                     )}
//                     {recommended.data.length === 0 ? (
//                         <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
//                             <Inbox className="h-16 w-16 text-muted-foreground" />
//                             <span>Пока нет рекомендованных кандидатов</span>
//                             <motion.button
//                                 onClick={searchCandidates}
//                                 disabled={isSearching}
//                                 whileTap={{ scale: 0.95 }}
//                                 whileHover={{ scale: 1.05 }}
//                                 animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
//                                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
//                             >
//                                 {isSearching && (
//                                     <span className="animate-spin inline-block">
//                                         <Loader2 />
//                                     </span>
//                                 )}
//                                 Начать поиск
//                             </motion.button>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="flex items-center justify-end mt-4">
//                                 <motion.button
//                                     onClick={searchCandidates}
//                                     disabled={isSearching}
//                                     whileTap={{ scale: 0.95 }}
//                                     whileHover={{ scale: 1.05 }}
//                                     animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
//                                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
//                                 >
//                                     {isSearching && (
//                                         <span className="animate-spin inline-block">
//                                             <Loader2 />
//                                         </span>
//                                     )}
//                                     Начать поиск
//                                 </motion.button>
//                             </div>
//                             {recommended.data.map((recommend: Recommended, index) => (
//                                 <JobseekerCard vacancy={recommend.vacancy} showScore={true} score={recommend.score} key={index}
//                                                jobseeker={recommend.jobseeker} />
//                             ))}
//                             <div className="flex justify-end">
//                                 <JobseekerPaginate data={recommended} />
//                             </div>
//                         </>
//                     )}
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }

// import React, { useState, useEffect, useCallback } from 'react';
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { JobSeekerPagination, JobSeekerProfile } from '@/types/jobseeker';
// import { JobseekerCard } from '@/components/employer/jobseeker-list';
// import { Inbox, Loader2, Search, SlidersHorizontal } from 'lucide-react';
// import { Input } from '@/components/ui/input';
// import { Button } from '@/components/ui/button';
// import { router, usePage } from '@inertiajs/react';
// import { motion } from 'framer-motion';
// import { Recommended, RecommendedPagination } from '@/types/employer';
// import { toast } from 'sonner';
// import JobseekerPaginate from '@/components/jobseeker-paginate';
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// import { Label } from '@/components/ui/label';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// import { Badge } from '@/components/ui/badge';
// import { debounce } from 'lodash';
// import { SharedData } from '@/types';
// import { industries } from '@/lib/jobseeker.data';
//
// interface FilterState {
//     search: string;
//     industry: string | null;
// }
//
// export default function EmployerDashboard({ jobseekers, recommended }: { jobseekers: JobSeekerPagination; recommended: RecommendedPagination }) {
//     const props = usePage<SharedData>().props;
//     const tab = (props.tab as string | undefined) ?? 'search'; // Fallback to 'search'
//     const filters = (props.filters as FilterState) ;
//     const vacanciesId = (props.vacanciesId as number[]) ;
//     const [activeTab, setActiveTab] = useState<string>(tab);
//     const [searchTerm, setSearchTerm] = useState<string>(filters.search);
//     const [recommendedSearchTerm, setRecommendedSearchTerm] = useState<string>(filters.search);
//     const [showFilters, setShowFilters] = useState(false);
//     const [showRecommendedFilters, setShowRecommendedFilters] = useState(false);
//     const [activeFilters, setActiveFilters] = useState<FilterState>({
//         search: filters.search,
//         industry: filters.industry,
//     });
//     const [recommendedActiveFilters, setRecommendedActiveFilters] = useState<FilterState>({
//         search: filters.search,
//         industry: filters.industry,
//     });
//     const [isSearching, setIsSearching] = useState(false);
//
//     // Debug: Log props and tab state
//     useEffect(() => {
//         console.log('Props received:', { tab, filters, vacanciesId, activeTab });
//         console.log('Current URL:', window.location.href);
//     }, [tab, filters, vacanciesId, activeTab]);
//
//     // Sync activeTab with tab prop
//     useEffect(() => {
//         if (tab && tab !== activeTab) {
//             console.log(`Updating activeTab from ${activeTab} to ${tab}`);
//             setActiveTab(tab);
//         }
//     }, [tab]);
//
//     // Debounced function to update URL with filters for search tab
//     const updateFilters = useCallback(
//         debounce((filters: FilterState) => {
//             const params: Record<string, any> = {};
//             if (filters.search) params.search = filters.search;
//             if (filters.industry) params.industry = filters.industry;
//
//             router.get(route('dashboard'), params, {
//                 preserveState: true,
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     toast.success('Фильтры и поиск применены');
//                 },
//                 onError: () => {
//                     toast.error('Ошибка при применении фильтров или поиска');
//                 },
//             });
//         }, 300),
//         []
//     );
//
//     // Debounced function to update URL with filters for recommended tab
//     const updateRecommendedFilters = useCallback(
//         debounce((filters: FilterState) => {
//             const params: Record<string, any> = {};
//             if (filters.search) params.search = filters.search;
//             if (filters.industry) params.industry = filters.industry;
//
//             router.get(route('dashboard'), { ...params, tab: 'recommended' }, {
//                 preserveState: true,
//                 preserveScroll: true,
//                 onSuccess: () => {
//                     toast.success('Фильтры и поиск применены для рекомендованных');
//                 },
//                 onError: () => {
//                     toast.error('Ошибка при применении фильтров или поиска');
//                 },
//             });
//         }, 300),
//         []
//     );
//
//     // Sync filters with URL for search tab
//     useEffect(() => {
//         const updatedFilters = { ...activeFilters, search: searchTerm };
//         updateFilters(updatedFilters);
//         return () => {
//             updateFilters.cancel();
//         };
//     }, [searchTerm, activeFilters, updateFilters]);
//
//     // Sync filters with URL for recommended tab
//     useEffect(() => {
//         const updatedFilters = { ...recommendedActiveFilters, search: recommendedSearchTerm };
//         updateRecommendedFilters(updatedFilters);
//         return () => {
//             updateRecommendedFilters.cancel();
//         };
//     }, [recommendedSearchTerm, recommendedActiveFilters, updateRecommendedFilters]);
//
//     const hasActiveFilters = () => {
//         return activeFilters.search || activeFilters.industry !== null;
//     };
//
//     const hasRecommendedActiveFilters = () => {
//         return recommendedActiveFilters.search || recommendedActiveFilters.industry !== null;
//     };
//
//     const handleResetFilters = () => {
//         const resetFilters = {
//             search: '',
//             industry: null,
//         };
//         setActiveFilters(resetFilters);
//         setSearchTerm('');
//         updateFilters(resetFilters);
//         toast.info('Фильтры и поиск сброшены');
//     };
//
//     const handleResetRecommendedFilters = () => {
//         const resetFilters = {
//             search: '',
//             industry: null,
//         };
//         setRecommendedActiveFilters(resetFilters);
//         setRecommendedSearchTerm('');
//         updateRecommendedFilters(resetFilters);
//         toast.info('Фильтры и поиск сброшены для рекомендованных');
//     };
//
//     const handleApplyFilters = (filters: FilterState) => {
//         setActiveFilters(filters);
//         setShowFilters(false);
//         updateFilters(filters);
//         toast.success('Фильтры применены');
//     };
//
//     const handleApplyRecommendedFilters = (filters: FilterState) => {
//         setRecommendedActiveFilters(filters);
//         setShowRecommendedFilters(false);
//         updateRecommendedFilters(filters);
//         toast.success('Фильтры применены для рекомендованных');
//     };
//
//     const searchCandidates = () => {
//         setIsSearching(true);
//         router.post(route('recommended.user'), { vacancyIds: vacanciesId }, {
//             onSuccess: () => {
//                 if (vacanciesId.length === 0) {
//                     toast.info('У вас нет пока вакансий для того чтобы найти рекомендуемых кандидатов');
//                 } else {
//                     toast.success('Рекомендации успешно найдены');
//                 }
//             },
//             onError: () => {
//                 toast.error('Произошла ошибка во время поиска');
//             },
//             onFinish: () => {
//                 setIsSearching(false);
//             },
//         });
//     };
//
//     return (
//         <div className="">
//             <Tabs value={activeTab} onValueChange={setActiveTab} className="">
//                 <TabsList className="grid w-full grid-cols-2">
//                     <TabsTrigger value="search">Поиск кандидатов</TabsTrigger>
//                     <TabsTrigger value="recommended">Рекомендованные</TabsTrigger>
//                 </TabsList>
//                 <TabsContent value="search" className="space-y-6">
//                     <div className="mt-4 flex gap-4">
//                         <div className="relative flex-1">
//                             <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
//                             <Input
//                                 placeholder="Поиск кандидатов по имени, навыкам, опыту, образованию..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                                 className="pl-10"
//                             />
//                         </div>
//                         <Dialog open={showFilters} onOpenChange={setShowFilters}>
//                             <DialogTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className={hasActiveFilters() ? 'border-primary text-primary' : ''}
//                                 >
//                                     <SlidersHorizontal className="h-4 w-4 mr-2" />
//                                     Фильтры
//                                     {hasActiveFilters() && (
//                                         <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
//                                             !
//                                         </Badge>
//                                     )}
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Фильтры кандидатов</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <Label>Отрасль</Label>
//                                         <Select
//                                             value={activeFilters.industry || 'all'}
//                                             onValueChange={(value) =>
//                                                 setActiveFilters({ ...activeFilters, industry: value === 'all' ? null : value })
//                                             }
//                                         >
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Выберите отрасль" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="all">Все отрасли</SelectItem>
//                                                 {industries.map((industry) => (
//                                                     <SelectItem key={industry.id} value={industry.id.toString()}>
//                                                         {industry.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button onClick={() => handleApplyFilters(activeFilters)}>Применить</Button>
//                                         <Button variant="outline" onClick={handleResetFilters}>Сбросить</Button>
//                                     </div>
//                                 </div>
//                             </DialogContent>
//                         </Dialog>
//                         {hasActiveFilters() && (
//                             <Button variant="ghost" onClick={handleResetFilters}>
//                                 Сбросить
//                             </Button>
//                         )}
//                     </div>
//                     {hasActiveFilters() && (
//                         <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
//                             <span className="text-sm font-medium">Активные фильтры:</span>
//                             {activeFilters.search && (
//                                 <Badge variant="secondary">Поиск: {activeFilters.search}</Badge>
//                             )}
//                             {activeFilters.industry && (
//                                 <Badge variant="secondary">
//                                     Отрасль: {industries.find((i) => i.id.toString() === activeFilters.industry)?.name || ''}
//                                 </Badge>
//                             )}
//                         </div>
//                     )}
//                     <div className="flex justify-between items-center">
//                         <p className="text-sm text-muted-foreground">
//                             {/*Найдено {jobseekers.data.length}{' '}*/}
//                             {/*{jobseekers.data.length === 1 ? 'кандидат' : 'кандидатов'}*/}
//                         </p>
//                     </div>
//                     {jobseekers.data.length === 0 ? (
//                         <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
//                             <Inbox className="h-16 w-16 text-muted-foreground" />
//                             <span>Пока нет кандидатов</span>
//                         </div>
//                     ) : (
//                         <>
//                             {jobseekers.data.map((jobseeker: JobSeekerProfile, index) => (
//                                 <JobseekerCard key={index} jobseeker={jobseeker} />
//                             ))}
//                             <div className="flex justify-end">
//                                 <JobseekerPaginate data={jobseekers} />
//                             </div>
//                         </>
//                     )}
//                 </TabsContent>
//                 <TabsContent value="recommended" className="space-y-6">
//                     <div className="mt-4 flex gap-4">
//                         <div className="relative flex-1">
//                             <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
//                             <Input
//                                 placeholder="Поиск рекомендованных кандидатов по имени, навыкам, опыту, образованию..."
//                                 value={recommendedSearchTerm}
//                                 onChange={(e) => setRecommendedSearchTerm(e.target.value)}
//                                 className="pl-10"
//                             />
//                         </div>
//                         <Dialog open={showRecommendedFilters} onOpenChange={setShowRecommendedFilters}>
//                             <DialogTrigger asChild>
//                                 <Button
//                                     variant="outline"
//                                     className={hasRecommendedActiveFilters() ? 'border-primary text-primary' : ''}
//                                 >
//                                     <SlidersHorizontal className="h-4 w-4 mr-2" />
//                                     Фильтры
//                                     {hasRecommendedActiveFilters() && (
//                                         <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
//                                             !
//                                         </Badge>
//                                     )}
//                                 </Button>
//                             </DialogTrigger>
//                             <DialogContent>
//                                 <DialogHeader>
//                                     <DialogTitle>Фильтры рекомендованных кандидатов</DialogTitle>
//                                 </DialogHeader>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <Label>Отрасль</Label>
//                                         <Select
//                                             value={recommendedActiveFilters.industry || 'all'}
//                                             onValueChange={(value) =>
//                                                 setRecommendedActiveFilters({ ...recommendedActiveFilters, industry: value === 'all' ? null : value })
//                                             }
//                                         >
//                                             <SelectTrigger>
//                                                 <SelectValue placeholder="Выберите отрасль" />
//                                             </SelectTrigger>
//                                             <SelectContent>
//                                                 <SelectItem value="all">Все отрасли</SelectItem>
//                                                 {industries.map((industry) => (
//                                                     <SelectItem key={industry.id} value={industry.id.toString()}>
//                                                         {industry.name}
//                                                     </SelectItem>
//                                                 ))}
//                                             </SelectContent>
//                                         </Select>
//                                     </div>
//                                     <div className="flex gap-2">
//                                         <Button onClick={() => handleApplyRecommendedFilters(recommendedActiveFilters)}>Применить</Button>
//                                         <Button variant="outline" onClick={handleResetRecommendedFilters}>Сбросить</Button>
//                                     </div>
//                                 </div>
//                             </DialogContent>
//                         </Dialog>
//                         {hasRecommendedActiveFilters() && (
//                             <Button variant="ghost" onClick={handleResetRecommendedFilters}>
//                                 Сбросить
//                             </Button>
//                         )}
//                     </div>
//                     {hasRecommendedActiveFilters() && (
//                         <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
//                             <span className="text-sm font-medium">Активные фильтры:</span>
//                             {recommendedActiveFilters.search && (
//                                 <Badge variant="secondary">Поиск: {recommendedActiveFilters.search}</Badge>
//                             )}
//                             {recommendedActiveFilters.industry && (
//                                 <Badge variant="secondary">
//                                     Отрасль: {industries.find((i) => i.id.toString() === recommendedActiveFilters.industry)?.name || ''}
//                                 </Badge>
//                             )}
//                         </div>
//                     )}
//                     {recommended.data.length === 0 ? (
//                         <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
//                             <Inbox className="h-16 w-16 text-muted-foreground" />
//                             <span>Пока нет рекомендованных кандидатов</span>
//                             <motion.button
//                                 onClick={searchCandidates}
//                                 disabled={isSearching}
//                                 whileTap={{ scale: 0.95 }}
//                                 whileHover={{ scale: 1.05 }}
//                                 animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
//                                 transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                 className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
//                             >
//                                 {isSearching && (
//                                     <span className="animate-spin inline-block">
//                                         <Loader2 />
//                                     </span>
//                                 )}
//                                 Начать поиск
//                             </motion.button>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="flex items-center justify-end mt-4">
//                                 <motion.button
//                                     onClick={searchCandidates}
//                                     disabled={isSearching}
//                                     whileTap={{ scale: 0.95 }}
//                                     whileHover={{ scale: 1.05 }}
//                                     animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
//                                     transition={{ type: 'spring', stiffness: 300, damping: 20 }}
//                                     className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
//                                 >
//                                     {isSearching && (
//                                         <span className="animate-spin inline-block">
//                                             <Loader2 />
//                                         </span>
//                                     )}
//                                     Начать поиск
//                                 </motion.button>
//                             </div>
//                             {recommended.data.map((recommend: Recommended, index) => (
//                                 <JobseekerCard
//                                     vacancy={recommend.vacancy}
//                                     showScore={true}
//                                     score={recommend.score}
//                                     key={index}
//                                     jobseeker={recommend.jobseeker}
//                                 />
//                             ))}
//                             <div className="flex justify-end">
//                                 <JobseekerPaginate data={recommended} />
//                             </div>
//                         </>
//                     )}
//                 </TabsContent>
//             </Tabs>
//         </div>
//     );
// }

import React, { useState, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { JobSeekerPagination, JobSeekerProfile } from '@/types/jobseeker';
import { JobseekerCard } from '@/components/employer/jobseeker-list';
import { Inbox, Loader2, Search, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { router, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Recommended, RecommendedPagination } from '@/types/employer';
import { toast } from 'sonner';
import JobseekerPaginate from '@/components/jobseeker-paginate';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { debounce } from 'lodash';
import { SharedData } from '@/types';
import { industries } from '@/lib/jobseeker.data';

interface FilterState {
    search: string;
    industry: string | null;
}

export default function EmployerDashboard({ jobseekers, recommended }: { jobseekers: JobSeekerPagination; recommended: RecommendedPagination }) {
    const props = usePage<SharedData & { tab?: string; filters: FilterState; vacanciesId: number[] }>().props;
    const tab = props.tab ?? 'search'; // Fallback to 'search'
    const filters = props.filters ?? { search: '', industry: null };
    const vacanciesId = props.vacanciesId ?? [];
    const [activeTab, setActiveTab] = useState<string>(tab);
    const [searchTerm, setSearchTerm] = useState<string>(filters.search);
    const [recommendedSearchTerm, setRecommendedSearchTerm] = useState<string>(filters.search);
    const [showFilters, setShowFilters] = useState(false);
    const [showRecommendedFilters, setShowRecommendedFilters] = useState(false);
    const [activeFilters, setActiveFilters] = useState<FilterState>({
        search: filters.search,
        industry: filters.industry,
    });
    const [recommendedActiveFilters, setRecommendedActiveFilters] = useState<FilterState>({
        search: filters.search,
        industry: filters.industry,
    });
    const [isSearching, setIsSearching] = useState(false);

    // Debug: Log props and tab state
    useEffect(() => {
    }, [tab, filters, vacanciesId, activeTab]);

    // Sync activeTab with tab prop
    useEffect(() => {
        if (tab !== activeTab) {
            setActiveTab(tab);
        }
    }, [tab]);

    // Debounced function to update URL with filters
    const updateFilters = useCallback(
        debounce((filters: FilterState, tab: string) => {
            const params: Record<string, any> = { tab };
            if (filters.search) params.search = filters.search;
            if (filters.industry) params.industry = filters.industry;

            router.get(route('dashboard'), params, {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    toast.success(`Фильтры и поиск применены для вкладки ${tab === 'search' ? 'Поиск' : 'Рекомендованные'}`);
                },
                onError: () => {
                    toast.error('Ошибка при применении фильтров или поиска');
                },
            });
        }, 300),
        []
    );

    // Sync filters with URL for search tab
    useEffect(() => {
        if (activeTab === 'search') {
            const updatedFilters = { ...activeFilters, search: searchTerm };
            updateFilters(updatedFilters, 'search');
        }
        return () => {
            updateFilters.cancel();
        };
    }, [searchTerm, activeFilters, updateFilters, activeTab]);

    // Sync filters with URL for recommended tab
    useEffect(() => {
        if (activeTab === 'recommended') {
            const updatedFilters = { ...recommendedActiveFilters, search: recommendedSearchTerm };
            updateFilters(updatedFilters, 'recommended');
        }
        return () => {
            updateFilters.cancel();
        };
    }, [recommendedSearchTerm, recommendedActiveFilters, updateFilters, activeTab]);

    const hasActiveFilters = () => {
        return activeFilters.search || activeFilters.industry !== null;
    };

    const hasRecommendedActiveFilters = () => {
        return recommendedActiveFilters.search || recommendedActiveFilters.industry !== null;
    };

    const handleResetFilters = () => {
        const resetFilters = { search: '', industry: null };
        setActiveFilters(resetFilters);
        setSearchTerm('');
        updateFilters(resetFilters, 'search');
        toast.info('Фильтры и поиск сброшены для поиска');
    };

    const handleResetRecommendedFilters = () => {
        const resetFilters = { search: '', industry: null };
        setRecommendedActiveFilters(resetFilters);
        setRecommendedSearchTerm('');
        updateFilters(resetFilters, 'recommended');
        toast.info('Фильтры и поиск сброшены для рекомендованных');
    };

    const handleApplyFilters = (filters: FilterState) => {
        setActiveFilters(filters);
        setShowFilters(false);
        updateFilters(filters, 'search');
        toast.success('Фильтры применены для поиска');
    };

    const handleApplyRecommendedFilters = (filters: FilterState) => {
        setRecommendedActiveFilters(filters);
        setShowRecommendedFilters(false);
        updateFilters(filters, 'recommended');
        toast.success('Фильтры применены для рекомендованных');
    };

    const searchCandidates = (targetTab: string = 'recommended') => {
        setIsSearching(true);
        router.post(route('recommended.user'), { vacancyIds: vacanciesId }, {
            onSuccess: () => {
                if (vacanciesId.length === 0) {
                    toast.info('У вас нет пока вакансий для того чтобы найти рекомендуемых кандидатов');
                } else {
                    toast.success('Рекомендации успешно найдены');
                    setActiveTab(targetTab);
                    updateFilters(targetTab === 'search' ? activeFilters : recommendedActiveFilters, targetTab);
                }
            },
            onError: () => {
                toast.error('Произошла ошибка во время поиска');
            },
            onFinish: () => {
                setIsSearching(false);
            },
        });
    };

    return (
        <div className="">
            <Tabs
                value={activeTab}
                onValueChange={(value) => {
                    setActiveTab(value);
                    const filters = value === 'search' ? activeFilters : recommendedActiveFilters;
                    updateFilters(filters, value);
                }}
                className=""
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="search">Поиск кандидатов</TabsTrigger>
                    <TabsTrigger value="recommended">Рекомендованные</TabsTrigger>
                </TabsList>
                <TabsContent value="search" className="space-y-6">
                    <div className="mt-4 flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input
                                placeholder="Поиск кандидатов по имени, навыкам, опыту, образованию..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Dialog open={showFilters} onOpenChange={setShowFilters}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={hasActiveFilters() ? 'border-primary text-primary' : ''}
                                >
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Фильтры
                                    {hasActiveFilters() && (
                                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                            !
                                        </Badge>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Фильтры кандидатов</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Отрасль</Label>
                                        <Select
                                            value={activeFilters.industry || 'all'}
                                            onValueChange={(value) =>
                                                setActiveFilters({ ...activeFilters, industry: value === 'all' ? null : value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите отрасль" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Все отрасли</SelectItem>
                                                {industries.map((industry) => (
                                                    <SelectItem key={industry.id} value={industry.id.toString()}>
                                                        {industry.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleApplyFilters(activeFilters)}>Применить</Button>
                                        <Button variant="outline" onClick={handleResetFilters}>Сбросить</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        {hasActiveFilters() && (
                            <Button variant="ghost" onClick={handleResetFilters}>
                                Сбросить
                            </Button>
                        )}
                    </div>
                    {hasActiveFilters() && (
                        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
                            <span className="text-sm font-medium">Активные фильтры:</span>
                            {activeFilters.search && (
                                <Badge variant="secondary">Поиск: {activeFilters.search}</Badge>
                            )}
                            {activeFilters.industry && (
                                <Badge variant="secondary">
                                    Отрасль: {industries.find((i) => i.id.toString() === activeFilters.industry)?.name || ''}
                                </Badge>
                            )}
                        </div>
                    )}
                    <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                            {/*Найдено {jobseekers.data.length}{' '}*/}
                            {/*{jobseekers.data.length === 1 ? 'кандидат' : 'кандидатов'}*/}
                        </p>
                    </div>
                    {jobseekers.data.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
                            <Inbox className="h-16 w-16 text-muted-foreground" />
                            <span>Пока нет кандидатов</span>
                            <motion.button
                                onClick={() => searchCandidates('search')}
                                disabled={isSearching}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
                            >
                                {isSearching && (
                                    <span className="animate-spin inline-block">
                                        <Loader2 />
                                    </span>
                                )}
                                Начать поиск
                            </motion.button>
                        </div>
                    ) : (
                        <>
                            {jobseekers.data.map((jobseeker: JobSeekerProfile, index) => (
                                <JobseekerCard key={index} jobseeker={jobseeker} />
                            ))}
                            <div className="flex justify-end">
                                <JobseekerPaginate data={jobseekers} />
                            </div>
                        </>
                    )}
                </TabsContent>
                <TabsContent value="recommended" className="space-y-6">
                    <div className="mt-4 flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
                            <Input
                                placeholder="Поиск рекомендованных кандидатов по имени, навыкам, опыту, образованию..."
                                value={recommendedSearchTerm}
                                onChange={(e) => setRecommendedSearchTerm(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Dialog open={showRecommendedFilters} onOpenChange={setShowRecommendedFilters}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={hasRecommendedActiveFilters() ? 'border-primary text-primary' : ''}
                                >
                                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                                    Фильтры
                                    {hasRecommendedActiveFilters() && (
                                        <Badge variant="secondary" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                                            !
                                        </Badge>
                                    )}
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Фильтры рекомендованных кандидатов</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <div>
                                        <Label>Отрасль</Label>
                                        <Select
                                            value={recommendedActiveFilters.industry || 'all'}
                                            onValueChange={(value) =>
                                                setRecommendedActiveFilters({ ...recommendedActiveFilters, industry: value === 'all' ? null : value })
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите отрасль" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">Все отрасли</SelectItem>
                                                {industries.map((industry) => (
                                                    <SelectItem key={industry.id} value={industry.id.toString()}>
                                                        {industry.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => handleApplyRecommendedFilters(recommendedActiveFilters)}>Применить</Button>
                                        <Button variant="outline" onClick={handleResetRecommendedFilters}>Сбросить</Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        {hasRecommendedActiveFilters() && (
                            <Button variant="ghost" onClick={handleResetRecommendedFilters}>
                                Сбросить
                            </Button>
                        )}
                    </div>
                    {hasRecommendedActiveFilters() && (
                        <div className="flex flex-wrap gap-2 p-4 bg-muted/50 rounded-lg">
                            <span className="text-sm font-medium">Активные фильтры:</span>
                            {recommendedActiveFilters.search && (
                                <Badge variant="secondary">Поиск: {recommendedActiveFilters.search}</Badge>
                            )}
                            {recommendedActiveFilters.industry && (
                                <Badge variant="secondary">
                                    Отрасль: {industries.find((i) => i.id.toString() === recommendedActiveFilters.industry)?.name || ''}
                                </Badge>
                            )}
                        </div>
                    )}
                    {recommended.data.length === 0 ? (
                        <div className="flex flex-col items-center gap-4 py-20 text-center text-muted-foreground">
                            <Inbox className="h-16 w-16 text-muted-foreground" />
                            <span>Пока нет рекомендованных кандидатов</span>
                            <motion.button
                                onClick={() => searchCandidates('recommended')}
                                disabled={isSearching}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
                            >
                                {isSearching && (
                                    <span className="animate-spin inline-block">
                                        <Loader2 />
                                    </span>
                                )}
                                Начать поиск
                            </motion.button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-end mt-4">
                                <motion.button
                                    onClick={() => searchCandidates('recommended')}
                                    disabled={isSearching}
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{ scale: 1.05 }}
                                    animate={isSearching ? { rotate: 360 } : { rotate: 0 }}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center gap-2"
                                >
                                    {isSearching && (
                                        <span className="animate-spin inline-block">
                                            <Loader2 />
                                        </span>
                                    )}
                                    Начать поиск
                                </motion.button>
                            </div>
                            {recommended.data.map((recommend: Recommended, index) => (
                                <JobseekerCard
                                    vacancy={recommend.vacancy}
                                    showScore={true}
                                    score={recommend.score}
                                    key={index}
                                    jobseeker={recommend.jobseeker}
                                />
                            ))}
                            <div className="flex justify-end">
                                <JobseekerPaginate data={recommended} />
                            </div>
                        </>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
