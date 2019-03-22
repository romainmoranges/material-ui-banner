import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Card, Grid, Typography, Button, Divider,
  CardActions, CardContent, Avatar, Hidden, Collapse,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'block',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  cardContent: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  flex: {
    flexGrow: 1,
  },
  buttons: {
    alignSelf: 'flex-end',
    paddingLeft: '90px !important',
  },
  label: {
    alignSelf: 'center',
  }
});

@withStyles(styles)
export default class Banner extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    buttonLabel: PropTypes.string,
    buttonOnClick: PropTypes.func,
    buttonComponent: PropTypes.element,
    buttonProps: PropTypes.object,
    showDismissButton: PropTypes.bool,
    dismissButtonLabel: PropTypes.string,
    onClose: PropTypes.func,
    icon: PropTypes.element,
    iconProps: PropTypes.object,
    appBar: PropTypes.bool,
  }

  static defaultProps = {
    open: true,
    buttonOnClick: () => {},
    showDismissButton: true,
    dismissButtonLabel: 'Dismiss',
    appBar: false,
    buttonComponent: 'button',
    buttonProps: {},
    iconProps: {},
  }

  renderButtons() {
    const {
      classes,
      onClose,
      showDismissButton,
      dismissButtonLabel,
      buttonOnClick,
      buttonLabel,
      buttonComponent,
      buttonProps,
    } = this.props;

    return (
      <>
        <span className={classes.flex} />

        <Grid item className={classes.buttons}>
          {showDismissButton && (
            <Button
              variant="text"
              onClick={onClose}
            >
              {dismissButtonLabel}
            </Button>
          )}

          {!!buttonLabel && (
            <Button
              variant="text"
              onClick={buttonOnClick}
              component={buttonComponent}
              {...buttonProps}
            >
              {buttonLabel}
            </Button>
          )}
        </Grid>
      </>
    )
  }

  render() {
    const {
      open,
      classes,
      label,
      icon,
      iconProps,
      appBar,
    } = this.props;

    return (
      <Collapse in={open}>
        <Paper elevation={0} className={classes.root}>
          <Card elevation={0} className={appBar ? classes.appBar : ''}>
            <CardContent className={classes.cardContent}>
              <Grid
                container
                wrap="nowrap"
                spacing={16}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                {icon && (
                  <Grid item>
                    <Avatar className={classes.avatar} {...iconProps}>
                      {icon}
                    </Avatar>
                  </Grid>
                )}

                <Grid item className={classes.label}>
                  <Typography variant="body2">
                    {label}
                  </Typography>
                </Grid>

                <Hidden smDown>
                  {appBar && this.renderButtons()}
                </Hidden>
              </Grid>
            </CardContent>

            {!appBar && (
              <Hidden smDown>
                <CardActions>
                  {this.renderButtons()}
                </CardActions>
              </Hidden>
            )}

            <Hidden mdUp>
              <CardActions>
                {this.renderButtons()}
              </CardActions>
            </Hidden>

            <Hidden smDown>
              <div />
            </Hidden>
          </Card>

          <Divider />
        </Paper>
      </Collapse>
    );
  }
}
