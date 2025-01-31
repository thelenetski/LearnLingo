export const selectTeachers = (state) => state.teachers.items;

export const selectFavoritesTeachers = (state) => state.teachers.favorites;

export const selectFilters = (state) => state.teachers.filters;

export const selectLoading = (state) => state.teachers.loading;

export const selectError = (state) => state.teachers.error;
