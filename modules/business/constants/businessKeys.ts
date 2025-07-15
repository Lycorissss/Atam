export const businessKeys = {
  all: () => ['business'] as const,
  lists: () => [...businessKeys.all(), 'list'] as const,
  list: () => [...businessKeys.lists()] as const,
  details: () => [...businessKeys.all(), 'detail'] as const,
  detail: (id: number) => [...businessKeys.details(), id] as const,
}
