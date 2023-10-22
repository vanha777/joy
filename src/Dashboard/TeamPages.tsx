import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Button from '@mui/joy/Button';
import List from '@mui/joy/List';
import ListSubheader from '@mui/joy/ListSubheader';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemContent from '@mui/joy/ListItemContent';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Slider from '@mui/joy/Slider';
import Sheet from '@mui/joy/Sheet';
import Input from '@mui/joy/Input';

// Icons import
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentIndRoundedIcon from '@mui/icons-material/AssignmentIndRounded';
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import BookRoundedIcon from '@mui/icons-material/BookRounded';

// custom
import Grid from '@mui/joy/Grid';
import { Autocomplete } from '@mui/joy';

const marks = [
  { value: 0, label: '0%' },
  { value: 10, label: '10%' },
  { value: 20, label: '20%' },
  { value: 30, label: '30%' },
  { value: 40, label: '40%' },
  { value: 50, label: '50%' },
  { value: 60, label: '60%' },
  { value: 70, label: '70%' },
  { value: 80, label: '80%' },
  { value: 90, label: '90%' },
  { value: 100, label: '100%' }
];

function valueText(value: number) {
  //console.log(value)
  return `${value}°C`;
}
const Option: Array<string> = ["design","mechanic","architecture"];
export default function TeamExample() {
  const [value, setValue] = React.useState<string | null>(Option[0]);
  const [inputValue, setInputValue] = React.useState('');
  return (
  
  
    <Grid container spacing={2} columns={16} sx={{ flexGrow: 1 }}>
       <Grid xs={8}>
          <Box
            sx={{
              p: 2,
              pb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography level="title-sm">Filter by</Typography>
            <Button size="sm" variant="plain" sx={{ fontSize: 'xs', px: 1 }}>
              Clear filters
            </Button>
          </Box>
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Keywords
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                placeholder="Give me a topics..."
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                options={['mechanic']}
                groupBy={(option) => option}
                getOptionLabel={(option) => option}
              />
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Chip
                  variant="soft"
                  size="sm"
                  endDecorator={<ChipDelete variant="soft" />}
                  sx={{ '--Chip-radius': (theme) => theme.vars.radius.sm }}
                >
                  UI designer
                </Chip>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Location
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Autocomplete
                placeholder="Position, skills, etc…"
                options={[
                  // some of Thailand provinces
                  'Bangkok',
                  'Amnat Charoen',
                  'Ang Thong',
                  'Bueng Kan',
                  'Buriram',
                  'Chachoengsao',
                  'Chai Nat',
                  'Chaiyaphum',
                  'Chanthaburi',
                  'Chiang Mai',
                  'Chiang Rai',
                  'Chonburi',
                ]}
                getOptionLabel={option => option}
              />
              <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <Slider
              aria-label="Small steps"
              defaultValue={30}
              getAriaValueText={valueText}
              step={10}
              marks={marks}
              min={0}
              max={100}
              valueLabelDisplay="auto"
              />
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Education
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowUpRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
            <Box sx={{ mt: 2 }}>
              <RadioGroup name="education" defaultValue="any">
                <Radio label="Any" value="any" size="sm" />
                <Radio label="High School" value="high-school" size="sm" />
                <Radio label="College" value="college" size="sm" />
                <Radio label="Post-graduate" value="post-graduate" size="sm" />
              </RadioGroup>
            </Box>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Typography level="body-sm" textColor="text.primary">
                Previous experience
              </Typography>
              <IconButton
                size="sm"
                variant="plain"
                color="primary"
                sx={{ '--IconButton-size': '24px' }}
              >
                <KeyboardArrowDownRoundedIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>
          </Box>
          </Grid>
          <Grid xs={8}>
          <List
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: 2,
            }}
          >
            {[...Array(3)].map((_, index) => (
              <Sheet
                key={index}
                component="li"
                variant="outlined"
                sx={{
                  borderRadius: 'sm',
                  p: 2,
                  listStyle: 'none',
                }}
              >
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Avatar
                    src="https://i.pravatar.cc/40?img=6"
                    srcSet="https://i.pravatar.cc/80?img=6 2x"
                    sx={{ borderRadius: 'sm' }}
                  />
                  <div>
                    <Typography>Andrew Smith</Typography>
                    <Typography level="body-xs">UI Designer</Typography>
                  </div>
                </Box>
                <Divider component="div" sx={{ my: 2 }} />
                <List sx={{ '--ListItemDecorator-size': '48px' }}>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator
                      sx={{
                        '&:before': {
                          content: '""',
                          position: 'absolute',
                          height: '100%',
                          width: '2px',
                          bgcolor: 'divider',
                          left: 'calc(var(--ListItem-paddingLeft) + 15px)',
                          top: '50%',
                        },
                      }}
                    >
                      <Avatar
                        size="sm"
                        src="https://www.vectorlogo.zone/logos/dribbble/dribbble-icon.svg"
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontSize="sm">Senior designer</Typography>
                      <Typography level="body-xs">Dribbble</Typography>
                    </ListItemContent>
                    <Typography level="body-sm">2015-now</Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start' }}>
                    <ListItemDecorator>
                      <Avatar
                        size="sm"
                        src="https://www.vectorlogo.zone/logos/pinterest/pinterest-icon.svg"
                        sx={{ backgroundColor: 'background.body' }}
                      />
                    </ListItemDecorator>
                    <ListItemContent>
                      <Typography fontSize="sm">Designer</Typography>
                      <Typography level="body-xs">Pinterest</Typography>
                    </ListItemContent>
                    <Typography level="body-sm">2012-2015</Typography>
                  </ListItem>
                </List>
                <Button
                  size="sm"
                  variant="plain"
                  endDecorator={<KeyboardArrowRightRoundedIcon fontSize="small" />}
                  sx={{ px: 1, mt: 1 }}
                >
                  Expand
                </Button>
                <Divider component="div" sx={{ my: 2 }} />
                <Typography fontSize="sm">Skills tags:</Typography>
                <Box sx={{ mt: 1.5, display: 'flex', gap: 1 }}>
                  <Chip
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    sx={{ borderRadius: 'sm' }}
                  >
                    UI design
                  </Chip>
                  <Chip
                    variant="outlined"
                    color="neutral"
                    size="sm"
                    sx={{ borderRadius: 'sm' }}
                  >
                    Illustration
                  </Chip>
                </Box>
              </Sheet>
            ))}
          </List>
          </Grid>
        </Grid>
   
  );
}