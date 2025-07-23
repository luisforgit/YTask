import {
  TextField,
  IconButton,
  Select,
  MenuItem,
  Stack,
  Autocomplete,
  Chip,
} from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export default function TodoFilters({
  orderByField,
  setOrderByField,
  orderDir,
  setOrderDir,
  filterText,
  setFilterText,
  filterPriority,
  setFilterPriority,
  filterTags,
  setFilterTags,
  allTags,           // opcional: array com tags únicas
}) {
  return (
    <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
      <Select
        value={orderByField}
        onChange={(e) => setOrderByField(e.target.value)}
        size="small"
      >
        <MenuItem value="deadline">Deadline</MenuItem>
        <MenuItem value="priority">Priority</MenuItem>
        <MenuItem value="timestamp">Created</MenuItem>
      </Select>

      <IconButton
        onClick={() => setOrderDir((p) => (p === 'desc' ? 'asc' : 'desc'))}
        size="small"
      >
        {orderDir === 'desc' ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
      </IconButton>

      <TextField
        placeholder="Search…"
        size="small"
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
        sx={{ minWidth: 140 }}
      />

      <TextField
        placeholder="Min priority"
        type="number"
        size="small"
        value={filterPriority}
        onChange={(e) =>
          setFilterPriority(e.target.value ? Number(e.target.value) : '')
        }
        sx={{ minWidth: 90 }}
      />

      {/* Filtro de tags – sem crash mesmo sem allTags */}
      <Autocomplete
        multiple
        freeSolo
        options={allTags ?? []}          // garantido sempre array
        value={filterTags}
        onChange={(_, v) => setFilterTags(v)}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField {...params} placeholder="Tags" size="small" />
        )}
        size="small"
        sx={{ minWidth: 160 }}
      />
    </Stack>
  );
}