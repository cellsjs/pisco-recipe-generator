# Plugin {{ pluginName }}

{{ pluginDescription }}

1. [check() hook](#check)
1. [config() hook](#config)
1. [run() hook](#run)
1. [prove() hook](#prove)
1. [notify() hook](#notify)
1. [emit() hook](#emit)
1. [testAddon() addon](#testAddon)

## <a name="check"></a>check() hook

Check if all you need to execute this step exists.

This shows a message like this.

```sh
Checking....
```

## <a name="config"></a>config() hook

Config the step to run.

This shows a message like this.

```sh
Configuring....
```

## <a name="run"></a>run() hook

Run the step.

This shows a message like this.

```sh
Running....
```

## <a name="prove"></a>prove() hook

Check if the step has run ok.

This shows a message like this.

```sh
Proving....
```

## <a name="notify"></a>notify() hook

Notify the end of the shot to someone or something.

This shows a message like this.

```sh
Notifying....
```

## <a name="emit"></a>emit() hook

Emit the result of the step to other steps. Allow communication between steps.

| Param | Type | Description |
| --- | --- | --- |
| param1 | String | description1 |
| param2 | Object | description2 |
| param3 | Number | description3 |

## <a name="testAddon"></a>testAddon addon

`this.testAddon(param1)` attemps to show a message with `param1` parameter.

| Param | Type | Description |
| --- | --- | --- |
| param1 | Object | description1 |

Example:

```javascript
run: function() {
  let contain = this.testAddon('sample');
}
```